import {
  Meteor
} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({
  // Create user
  'user.create': function createUser(options) {
    let user_id = Accounts.createUser({
      username: options.username,
      password: 'user123',
      email: '',
      profile: {
        name: options.name,
        organization: options.organization
      }
    });

    if(user_id) return true;
    else return false;
  },
  // Add image
  'user.image': function userImage(data) {
    if(this.userId) {
      Meteor.users.update({ _id: this.userId }, { $set: {'profile.image': data} });
      return true;
    } return false;
    
  },
});