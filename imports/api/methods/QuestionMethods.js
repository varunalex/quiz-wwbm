import { Meteor } from 'meteor/meteor';
import QuestionCol from './../schemas/questionSchema';

Meteor.methods({
  'question.insert': function branchesInsert(data) {
    QuestionCol.insert(data);
  },
  'question.statusUpdate': function statusUpdate(_id, status) {
    QuestionCol.update({ _id }, { $set: { status } });
  },
  'question.deleteQuestion': function deleteQuestion(_id) {
    QuestionCol.remove({ _id });
  },
});
