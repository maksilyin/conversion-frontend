export default {
    'file.upload': {
        method: 'post',
        url: 'file/upload/',
    },
    'file.delete': {
        method: 'delete',
        url: 'file/delete/',
    },
    'file.download': {
        method: 'get',
        url: 'file/download/{task}/{hash}/',
    },
    'file.download.all': {
        method: 'get',
        url: 'file/download/{task}/all/',
    },
    'task': {
        method: 'get',
        url: 'task/{task_id}/',
    },
    'task.create': {
        method: 'post',
        url: 'task/create/',
    },
    'task.send': {
        method: 'put',
        url: 'task/',
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
    }
} as const;