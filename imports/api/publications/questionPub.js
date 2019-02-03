import { Meteor } from 'meteor/meteor';
import QuestionCol from './../schemas/questionSchema';

Meteor.publish('questions', function () {
  return QuestionCol.find({});
});
