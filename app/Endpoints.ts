export default {
    'file.create': {
        method: 'post',
        url: 'file/',
    },
    'file.upload': {
        method: 'post',
        url: 'file/upload/',
    },
    'file.delete': {
        method: 'delete',
        url: 'file/delete/{task}/{hash}/',
    },
    'file.download': {
        method: 'get',
        url: 'file/download/{task}/{hash}/',
    },
    'file.download.all': {
        method: 'get',
        url: 'file/download/{task}/',
    },
    'task': {
        method: 'get',
        url: 'task/{task_id}/',
    },
    'task.create': {
        method: 'post',
        url: 'task/',
    },
    'task.send': {
        method: 'put',
        url: 'task/',
    },
    'task.delete': {
        method: 'delete',
        url: 'task/{task}/',
    },
    'formats': {
        method: 'get',
        url: 'formats/',
    },
    'formats.detail': {
        method: 'get',
        url: 'formats/{format}/',
    },
    'formats.detail.type': {
        method: 'get',
        url: 'formats/type/{type}/',
    },
    'page': {
        method: 'get',
        url: 'page/',
    },
    'text': {
        method: 'get',
        url: 'text/{key}/',
    },
    'lang': {
        method: 'get',
        url: 'lang/',
    },
    'csrf': {
        method: 'get',
        url: 'csrf-token',
    }
} as const;