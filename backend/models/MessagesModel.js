import mongoose from 'mongoose';
import User from './UserModel.js';
const messagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },

    messageType: {
        type: String,
        enum: ['text', 'audio', 'file'],
        required: true
    },
    content: {
        type: String,
        required: function(){
            return this.messageType === 'text';
        }
    },
    fileUrl: {
        type: String,
        required: function(){
            return this.messageType === 'file';
        }
    }, 

    timestamp: {
        type: Date,
        default: Date.now
    }
})


const Messages = mongoose.model('Messages', messagesSchema);
export default Messages;