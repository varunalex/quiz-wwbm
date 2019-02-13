import { Meteor } from 'meteor/meteor';
import RunCol from './../schemas/runSchema';
import { ActiveQuestionCol } from './../schemas/questionSchema';

Meteor.methods({
  'run.insert': function runInsert(data) {
    RunCol.insert(data);
  },
  'run.updateLang': function updateLang(_id, lang) {
    RunCol.update({ _id }, { $set: { lang, level: 1 } });
  },
  'run.levelUp': function updateLang(_id, level, score) {
    RunCol.update({ _id }, { $set: { level, score } });
  },
  'run.changeStatus': function changeStatus(_id) {
    RunCol.update({ _id }, { $set: { status: 0 } });
    ActiveQuestionCol.remove({});
  }
});
