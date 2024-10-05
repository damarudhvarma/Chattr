import mongoose from 'mongoose';
import User from './UserModel.js';

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages', required: false }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update updatedAt before saving
channelSchema.pre('save', function(next) {  
    this.updatedAt = Date.now();
    next();
});

// Middleware to update updatedAt before findOneAndUpdate
channelSchema.pre('findOneAndUpdate', function(next) {  
    this.set({ updatedAt: Date.now() });
    next();
});

const Channel = mongoose.model('Channels', channelSchema);

export default Channel;
