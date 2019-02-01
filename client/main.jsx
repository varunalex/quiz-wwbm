import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import RootRouter from './../imports/routes';

Meteor.startup(() => {
  render(<RootRouter />, document.getElementById('react-target'));
});
