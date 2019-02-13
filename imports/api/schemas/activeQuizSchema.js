import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ActiveQuizCol = new Mongo.Collection('activeQuiz');

const Schema = {};

Schema.ActiveQuiz = new SimpleSchema({
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
  },
  answers: {
    type: Array,
  },
  'answers.$': {
    type: String
  },
  level: {
    type: String,
    allowedValues: ['L1', 'L2', 'L3'],
  },
  lang: {
    type: String,
    allowedValues: ['Si', 'En'],
  },
  extra: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    defaultValue: 1,
  },
  active: {
    type: Number,
    defaultValue: 1,
  },
});

ActiveQuizCol.attachSchema(Schema.ActiveQuiz);

const ActiveQuizchema = Schema.ActiveQuiz;
export { ActiveQuizchema };
export default ActiveQuizCol;
