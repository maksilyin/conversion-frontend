import type {Task} from "~/types/Task";
import {useEcho} from "~/composables/useEcho";

const task = ref<Task | null>(null);
const isStarting = ref(false);

export const useTask = (taskUuid: string | null = null) => {
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

    const isProcessing = computed(() => {
        return status.value === 'pending' || status.value === 'processing' || isStarting.value
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

    let echo: any;

    onMounted(() => {
        const { Echo } = useEcho();
        echo = Echo;

        if (task.value) {
            startEcho();
        }
    })

    const startEcho = () => {
        echo.channel('task.' + uuid.value).listen('.TaskUpdated', (e: Task) => {
            console.log(e)
            task.value = e;
        })
    }

    const createTask = async (type: string) => {
        task.value = await api.callApi('task.create', {type});

        if (task.value) {
            startEcho();
        }
    }

    const startTask = async (sendData: any) => {
        try {
            isStarting.value = true;
            await api.callApi('task.send', {
                task: uuid.value,
                ...sendData
            });
        }
        catch (e: any) {
            toast.add({ title: 'Error', description: e.message, color: 'red' })
        }
    }

    const setTask = (payloadTask: Task) => {
        task.value = payloadTask;
    }

    const loadTask = async (uuid:string) => {
        task.value = await api.fetchData('task', { task_id: uuid });
    }

    const deleteTask = () => {
        task.value = null;
    }

    const createFile = async (data: object) => {
        if (!task.value) {
            throw new Error('Task is not created');
        }
        const params = {
            ...data,
            task: uuid.value,
            type: task.value.type,
        };
        return await api.callApi<string>('task.create.file', params);
    }

    const clearTask = async () => {
        const params = {
            task: uuid.value,
        };
        await api.callApi<string>('task.clear', params);
    }

    watch(status, () => {
        isStarting.value = false;
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
        payload,
        isProcessing,
        status,
        taskProgress,
        createFile,
    }
}