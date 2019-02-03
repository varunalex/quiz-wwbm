import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Header from './Header.jsx';
//import Table from './../../components/Table.jsx';
import dashboardStyle from './../../material-styles/dashboard';

class Dashboard extends React.Component {
  

  render() {
    const { classes } = this.props;

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

export default withStyles(dashboardStyle)(Dashboard);
