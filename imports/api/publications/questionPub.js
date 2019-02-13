import { Meteor } from 'meteor/meteor';
import QuestionCol, { ActiveQuestionCol } from './../schemas/questionSchema';

Meteor.publish('questions', function () {
  return QuestionCol.find({});
});

Meteor.publish('activeQuestion', function () {
  return ActiveQuestionCol.find({}, {skip: 0, limit: 1});
});
