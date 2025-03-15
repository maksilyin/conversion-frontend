import type {Task} from "~/types/Task";
import {useEcho} from "~/composables/useEcho";
import {useI18n} from "vue-i18n";

const task = ref<Task | null>(null);
const isProcessing = ref (false);
const isDeleted = ref(false);
let echo: any = false;

export const useTask = (taskUuid: string | null = null) => {
    const { t } = useI18n();
    const toast = useToast();
    const api = useApi();
    const uuid = computed(() => {
        return task.value?.uuid;
    });

    const payload = computed(() => {
        return task.value?.payload;
    });

    const status = computed(() => {
        return task.value?.status;
    });

    const isProcessingTask = computed(() => {
        return status.value === 'pending' || status.value === 'processing' || isProcessing.value
    });

    const taskProgress = computed(() => {
        let progress = 0;

        if (payload.value?.files) {
            const step = 100 / payload.value.files.length;

            payload.value.files.forEach(file => {
                if (file.status === 5) {
                    progress += step / 2;
                }
                else if (file.status === 6) {
                    progress += step;
                }
            });
        }

        return progress;
    })

    onMounted(() => {
        if (!echo) {
            startEcho();
        }
    })

    const setEcho = () => {
        console.log('setEcho')
        const {Echo} = useEcho();
        echo = Echo;
    }

    const startEcho = () => {
        if (!uuid.value) {
            return;
        }
        if (!echo) {
            setEcho()
        }
        const channelName = 'task.' + uuid.value;

        if (echo.connector.channels[channelName]) {
            console.log('Echo already subscribed to', channelName);
            return;
        }

        echo.channel(channelName).listen('.TaskUpdated', (e: Task) => {
            task.value = e;
        });
    }

    const createTask = async (type: string) => {
        try {
            task.value = await api.callApi('task.create', {type});

            if (task.value) {
                startEcho();
            }
        }
        catch (e: any) {
            showError(e.message)
        }
    }

    const startTask = async (sendData: any) => {
        try {
            isProcessing.value = true;
            await api.callApi('task.send', {
                task: uuid.value,
                ...sendData
            });
            isDeleted.value = false;
        }
        catch (e: any) {
            showError(e.message)
        }
    }

    const setTask = (payloadTask: Task) => {
        task.value = payloadTask;
        isDeleted.value = false;
    }

    const loadTask = async (uuid:string) => {
        task.value = await api.fetchData('task', { task_id: uuid });
    }

    const deleteTask = () => {
        task.value = null;
    }

    const clearTask = async () => {
        const params = {
            task: uuid.value,
        };
        isProcessing.value = true;

        api.callApi<string>('task.delete', params)
            .then(() => {
                isDeleted.value = true;
            })
            .catch(e => {
                showError(e.message)
            })
            .finally(() => {
                isProcessing.value = false;
            })
    }

    const showError = (message: string) => {
        toast.add({ title: t('error'), description: message, color: 'red' })
    }

    watch(status, () => {
        isProcessing.value = false;
    })

    return {
        task,
        uuid,
        createTask,
        loadTask,
        setTask,
        startEcho,
        startTask,
        deleteTask,
        clearTask,
        payload,
        isProcessingTask,
        status,
        taskProgress,
        isDeleted,
    }
}