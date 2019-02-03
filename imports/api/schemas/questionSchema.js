import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const QuestionCol = new Mongo.Collection('question');

const Schema = {};

Schema.Question = new SimpleSchema({
  _id: {
    type: String,
    required: false,
  },
  question: {
    type: String,
    min: 4,
  },
  answers: {
    type: Array,
  },
  'answers.$': {
    type: String
  },
  correct: {
    type: Number,
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

QuestionCol.attachSchema(Schema.Question);

const QuestionSchema = Schema.Order;
export { QuestionSchema };
export default QuestionCol;
