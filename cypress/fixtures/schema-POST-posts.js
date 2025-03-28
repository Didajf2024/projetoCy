export const testContratoPOSTposts = {
    type: 'object',
    required: [
        '_id',
        'text',
        'name',
        'avatar',
        'user',
        'likes',
        'comments',
        'date',
        '__v',
    ],
    properties:{
        _id: {
            type: 'string'
        },
        text: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        user: {
            type: 'string'
        },
        likes: {
            type: 'array',
            items:{}
        },
        comments: {
            type: 'string',
            items: {}
        },
        date:{
            type: 'string'
        },
        __v:{
            type: 'integer'
        }
    } 
    
}