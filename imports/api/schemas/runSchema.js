import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const RunCol = new Mongo.Collection('run');

const Schema = {};

Schema.Run = new SimpleSchema({
  _id: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
  },
  level: {
    type: Number,
    max: 10
  },
  fifty50: {
    type: Boolean,
    defaultValue: true,
  },
  activeQuiz: {
    type: String,
    required: false,
  },
  time: {
    type: Number,
  },
  score: {
    type: Number,
    defaultValue: 0,
  },
  lang: {
    type: String,
    required: false,
    allowedValues: ['Si', 'En']
  },
  status: {
    type: Number,
    allowedValues: [0, 1],
    defaultValue: 1,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  }
  
});

RunCol.attachSchema(Schema.Run);

const Runchema = Schema.Run;
export { Runchema };
export default RunCol;
