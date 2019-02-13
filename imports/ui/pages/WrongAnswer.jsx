import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import React from 'react';
import Sound from 'react-sound';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import RunCol from './../../api/schemas/runSchema';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 1,

    height: 500,
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50
  },
  usertext: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 50,
  },
  question: {
    marginTop: 25,
  },
  extra: {
    color: 'black',
  },
  timer: {
    padding: 20
  }
});

class WrongAnswer extends React.Component {
  state = {
    currentTack: `${Meteor.absoluteUrl()}sounds/false.mp3`,
  };
  constructor(props) {
    super(props);
    //binds
    this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
  }

  onFinishedPlaying() {

    this.setState({ currentTack: `${Meteor.absoluteUrl()}sounds/outro.mp3` });

  }

  render() {
    const { classes, runStatus, run } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div>
            <Grow in={true}>
              <Grid container justify="center" alignItems="center">
                <Grid container direction="row" justify="center" alignItems="center">
                  <Typography variant="h3" component="h3">💚 Wrong Answer! Thank you for your valuable time 💚</Typography>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Typography variant="h3" component="h3">See you soon 👋</Typography>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Typography variant="h4" component="h4" color="primary">Level : {runStatus ? run.level : ''} | Time Bonus : {runStatus ? run.score : ''} </Typography>
                </Grid>
              </Grid>
            </Grow>
          </div>
          <br />
          <Grid container justify="center" alignItems="center">
            <Button variant="outlined" component={Link} to="/logout" size="large">Log Out</Button>
          </Grid>
          <Sound
            url={this.state.currentTack}
            playStatus={Sound.status.PLAYING}
            volume={100}
            onFinishedPlaying={this.onFinishedPlaying}
          //loop={false}
          />
        </Paper>
      </div>
    );
  }
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const handle = Meteor.subscribe('lastRun');
  console.log(props);

  return {
    currentUser: Meteor.user(),
    runStatus: handle.ready(),
    run: RunCol.findOne({}),
  };
})(withStyles(styles)(WrongAnswer));