import { Meteor } from 'meteor/meteor';
import QuestionCol, { ActiveQuestionCol } from './../schemas/questionSchema';

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
  'question.get': function getQuestion(level, lang) {
    let r = QuestionCol.find({level, lang, status: 1}, {skip: 0, limit: 1});
    if(r.fetch().length == 1) {
      ActiveQuestionCol.remove({});
      ActiveQuestionCol.insert(r.fetch()[0]);
      return r.fetch();
    }
    r = QuestionCol.find({lang, status: 1}, {skip: 0, limit: 1}).fetch();
    ActiveQuestionCol.remove({});
    ActiveQuestionCol.insert(r[0]);
    return r;
  },
});
