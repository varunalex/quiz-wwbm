import { Meteor } from 'meteor/meteor';
import RunCol from './../schemas/runSchema';

Meteor.methods({
  'run.insert': function runInsert(data) {
    RunCol.insert(data);
  },
  'run.updateLang': function updateLang(_id, lang) {
    RunCol.update({ _id }, { $set: { lang } });
  }
});
