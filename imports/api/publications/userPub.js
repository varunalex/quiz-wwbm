import { Meteor } from 'meteor/meteor';
import RunCol from './../schemas/runSchema';

Meteor.publish('allusers', function () {
  return Meteor.users.find({});
});

Meteor.publish('activeRun', function () {
  return RunCol.find({status: 1}, {sort: {createdAt: -1}, skip: 0, limit: 1});
});

Meteor.publish('lastRun', function () {
  return RunCol.find({}, {sort: {createdAt: -1}, skip: 0, limit: 1});
});
