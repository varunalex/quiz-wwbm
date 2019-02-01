import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Schema = {};

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    min: 3,
    label: 'First Name',
    optional: true,
  },
  lastName: {
    type: String,
    label: 'Last Name',
    optional: true,
  },
});

Schema.Users = new SimpleSchema({
  _id: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  username: {
    type: String,
    min: 5,
    // By default account-password supports both email and username login.
    // Change em as : username is required and email is optional
  },
  emails: {
    type: Array,
    optional: true,
  },
  // email object inside email array
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true,
  },
  // email array ends
  services: Object,
  'services.password': Object,
  'services.password.bcrypt': {
    type: String,
    label: 'Password',
  },
  'services.resume': {
    type: Object,
    blackbox: true,
    optional: true,
  },
  profile: {
    type: Schema.UserProfile,
  },
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
});

Meteor.users.attachSchema(Schema.Users);
const UserSchema = Schema.Users;
export default UserSchema;
