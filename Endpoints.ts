export default {
    'file.upload': {
        method: 'post',
        url: 'file/upload/',
    },
    'file.delete': {
        method: 'delete',
        url: 'file/delete/',
    },
    'task': {
        method: 'get',
        url: 'task/{task_id}',
    },
    'task.create': {
        method: 'post',
        url: 'task/create/',
    },
    'task.send': {
        method: 'put',
        url: 'task/',
    }
} as const;