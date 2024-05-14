import mongoose from 'mongoose';
import {User} from './user.js';

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    trainings: [{
        type: Schema.Types.ObjectId,
        ref: 'Training',
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});


const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
});

const Program = mongoose.model('Program', ProgramSchema);
const Training = mongoose.model('Training', TrainingSchema);

export {Program, Training};