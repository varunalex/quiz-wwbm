import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Header from './Header.jsx';
//import Table from './../../components/Table.jsx';
import RunCol from './../../../api/schemas/runSchema';
import {ActiveQuestionCol} from './../../../api/schemas/questionSchema';
import dashboardStyle from './../../material-styles/dashboard';

class Dashboard extends React.Component {
  

  render() {
    const { classes } = this.props;
    console.log(this.props.activeRun, this.props.activeQuestion);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header title="Dashboard" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />


          <Typography variant="h4" gutterBottom component="h3">
            Dashboard
          </Typography>
          <div className={classes.tableContainer}>
            {/* <Table /> */}
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const handle = Meteor.subscribe('activeQuestion');
  const handle2 = Meteor.subscribe('activeRun');

  return {
    runStatus: handle.ready(),
    activeRun: RunCol.findOne({}),
    qStatus: handle2.ready(),
    activeQuestion: ActiveQuestionCol.findOne({}),
  };
})(withStyles(dashboardStyle)(Dashboard));
