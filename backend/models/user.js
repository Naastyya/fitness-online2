import mongoose from 'mongoose';
import {Program, Training} from './training.js';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Неправильний формат електронної пошти.']
    },
    passwordHash: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number,
        default: 0,
    },
    height: {
        type: Number,
        default: 0,
    },
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    favoritePrograms: [{
        type: Schema.Types.ObjectId,
        ref: 'Program'
    }],
    favoriteTrainings: [{
        type: Schema.Types.ObjectId,
        ref: 'Training'
    }]
});


const User = mongoose.model('User', UserSchema);

export {User};


