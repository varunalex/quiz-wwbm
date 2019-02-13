import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import green from '@material-ui/core/colors/green';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


//import Table from './../../components/Table.jsx';
import RunCol from './../../api/schemas/runSchema';
import { ActiveQuestionCol } from './../../api/schemas/questionSchema';

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: green[600],
    '&$checked': {
      color: green[500],
    },
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
  avGrid: {
    backGroundColor: '#fff',
  }
});


class Screen extends React.Component {
  state = {
    user: [],
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('mounted', this.props.run);
    if(this.props.activeRun) this.getUser();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.activeRun && prevProps.activeRun === undefined) {
      console.log(this.props.activeRun);
      this.getUser();
    }
    if(prevProps.activeRun && !this.props.activeRun) {
      this.setState({ user: [] });
    }
  }

  getLevels = () => (['Level One', 'Level Two', 'Level Three', 'First Round Final', 'Level Five', 'Level Six', 'Second Round Final', 'Level Eight', 'Level Nine', 'Final Level']);

  getUser() {
    const { user_id } = this.props.activeRun;

    Meteor.call('user.getUser', user_id, (err, res) => {
      if (!err) {
        this.setState({ user: res });
      } else {
        
      }
    });
  }

  render() {
    const { classes, question, qStatus, runStatus, activeRun } = this.props;
    const { user } = this.state;
    console.log(this.state.user);
    const steps = this.getLevels();
    
    return (
      <div>
        <div>
        {user.length == 1 ?
          <Grow in={true}>
            <Grid container justify="flex-end" alignItems="flex-end" className={classes.avGrid}>
              <Avatar alt={user[0].profile.name} src={user[0].profile.image} className={`${classes.avatar} webcam-filter`} />
              <div className={classes.usertext}>
                <Typography variant="h6" component="h6" color="primary">{user[0].profile.name}</Typography>
                <Typography component="p" color="secondary">{user[0].profile.organization}</Typography>
              </div>
            </Grid>
          </Grow> : ''}
      </div>
        <div>
        {runStatus && activeRun ?
          <Grow in={true}>
            <Stepper activeStep={activeRun.level - 1} orientation="horizontal" color="secondary">
              {steps.map((label, index) => (
                <Step key={label}>
                  
                    <StepLabel>{label}</StepLabel>
                  
                </Step>
              ))}
            </Stepper>
          </Grow> : ''}
      </div>
        {qStatus ?
          <Grow in={true}>
            <div>
              {
                question ?
                    <Grid container justify="center" alignItems="center" key={question._id} className={classes.question}>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <p className="question"><b>{question.question}</b></p>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <p className={classes.extra}>{question.extra ? question.extra : ''}</p>
                      </Grid>

                      <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid>
                        <Typography variant="h6" component="h6">1 .{question.answers[0]}</Typography>
                        </Grid>
                        <Grid>
                        <Typography variant="h6" component="h6">2. {question.answers[1]}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid>
                        <Typography variant="h6" component="h6">3. {question.answers[2]}</Typography>
                        </Grid>
                        <Grid>
                        <Typography variant="h6" component="h6">4. {question.answers[3]}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  : ''
              }
            </div>
          </Grow> : '' }
      </div>
    );
  }
}

Screen.propTypes = {
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
    question: ActiveQuestionCol.findOne({}),
  };
})(withStyles(styles)(Screen));
