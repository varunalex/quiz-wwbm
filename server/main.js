import { Meteor } from 'meteor/meteor';

import './../imports/startup/simpleschema-config';
import './../imports/api/methods/userMethods';
import './../imports/api/methods/QuestionMethods';
import './../imports/api/methods/runMethods';
import './../imports/api/publications/questionPub';
import './../imports/api/publications/userPub';


Meteor.startup(() => {
  
});
