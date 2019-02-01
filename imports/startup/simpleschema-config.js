import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(e => new Meteor.Error('validation-error', e.message));
