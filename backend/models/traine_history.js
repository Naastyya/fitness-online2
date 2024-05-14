import mongoose from 'mongoose';
import { User } from './user.js'
import { Training } from './training.js';
import { Program } from './training.js';

const Schema = mongoose.Schema;

const TrainingHistorySchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  weightChanged: {
    type: Boolean,
    required: true,
    default: false,
  },
  newWeight: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trainings: [{
    type: Schema.Types.ObjectId,
    ref: 'Training'
  }],
  programs: [{
    type: Schema.Types.ObjectId,
    ref: 'Program'
  }]
});

const TrainingHistory = mongoose.model('TrainingHistory', TrainingHistorySchema);

export {TrainingHistory};