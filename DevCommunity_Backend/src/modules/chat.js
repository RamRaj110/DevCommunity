const mogoose = require('mongoose');

const messageSchema = new mogoose.Schema({
    sender:{
        type: mogoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    } ,
    text:{
        type: String,
        required: true,
    },

}
,{ timestamps: true }
);

const chatSchema = new mogoose.Schema({
    participants: {
        type: [mogoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
    messages: [messageSchema]
});


const Chat = mogoose.model('Chat', chatSchema);

module.exports = Chat;