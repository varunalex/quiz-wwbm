import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import Sound from 'react-sound';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
import StepContent from '@material-ui/core/StepContent';

import RunCol from '../../api/schemas/runSchema';
import Snackbars from '../components/Snack.jsx';

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
  timer: {
    padding: 20
  }
});

class MainIntro extends React.Component {
  state = {
    question: [],
    selected: 0,
    time: 0,
    playingStatus: Sound.status.PLAYING,
    currentTrack: `${Meteor.absoluteUrl()}sounds/letsplay.mp3`,
  };
  constructor(props) {
    super(props);
    this.timer = null;
    // binds
    this.getQuestion = this.getQuestion.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.renderLevels = this.renderLevels.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.timeCal = this.timeCal.bind(this);
    this.normalise = this.normalise.bind(this);
    this.getMaxTime = this.getMaxTime.bind(this);
    this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
    this.changeRunStatus = this.changeRunStatus.bind(this);
    this.changeQuestionStatus = this.changeQuestionStatus.bind(this);
  }
  componentDidMount() {
    console.log('mounted', this.props.run);
    if(this.props.run) this.getQuestion();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.run && prevProps.run === undefined) {
      console.log(this.props.run);
      this.getQuestion();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getLevels = () => (['Level One', 'Level Two', 'Level Three', 'First Round Final', 'Level Five', 'Level Six', 'Second Round Final', 'Level Eight', 'Level Nine', 'Final Level']);

  getQuestion() {
    const { level, lang } = this.props.run;
    let qLevel = 'L1';
    if (level < 4) qLevel = 'L1';
    else if (level < 7) qLevel = 'L2';
    else if (level <= 10) qLevel = 'L3';
    if(this.timer) clearInterval(this.timer);
    this.setState({time: 0});

    Meteor.call('question.get', qLevel, lang, (err, res) => {
      if (!err) {
        this.setState({ question: res });
        this.timer = setInterval(this.timeCal, 1000);
      } else {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      }
    });
  }

  normalise(value) {
    let MAX = this.getMaxTime();
    return value * 100 / MAX;
  }

  getMaxTime() {
    const { level } = this.props.run;
    let MAX = 30;
    if (level < 4) MAX = 30;
    else if (level < 7) MAX = 40;
    else if (level <= 10) MAX = 50;

    return MAX;
  }

  timeCal() {
    let MAX = this.getMaxTime();
    const t = this.state.time;
    if(t > MAX) {
      clearInterval(this.timer);
      return;
    }
    this.setState({ time: t + 1});
  }

  changeRunStatus() {
    const { _id, level } = this.props.run;
    Meteor.call('run.changeStatus', _id, level + 1, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      }
    });
  }

  timeUp() {
    console.log('Time Out');
    this.changeRunStatus();
    this.props.history.replace('/timeout');
  }


  levelUp() {
    const { _id, level, score } = this.props.run;
    const newScore = this.getMaxTime() - this.state.time;
    Meteor.call('run.levelUp', _id, level + 1, newScore + score, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      }
    });
  }

  changeQuestionStatus() {
    Meteor.call('question.statusUpdate', this.state.question[0]._id, 0, (err) => {
      // Trigger snackbar
      this.child.handleClick('error', err.reason);
    });
  }

  onChangeAnswer(e) {
    this.setState({ selected: e.target.value });

    if(this.state.question[0].correct == e.target.value) {
      const { level } = this.props.run;
      console.log('boom');
      this.setState({ currentTrack: `${Meteor.absoluteUrl()}sounds/next.mp3`});
      if(level == 10) {
        console.log('winner');
        this.changeRunStatus();
        this.props.history.replace('/winner');
        return;
      }

      this.changeQuestionStatus();
      this.setState({ question: [], selected: 0 });
      this.levelUp();
      this.getQuestion();
    } else {
      console.log('wrong answer');
      
      this.changeRunStatus();
      this.props.history.replace('/wronganswer');
    }
    
  }

  onFinishedPlaying() {
    
      this.setState({ currentTrack: `${Meteor.absoluteUrl()}sounds/on-question.mp3`});
    
  }

  clickStart() {
    this.child.handleClick('info', 'Get set !');
    Meteor.call('run.updateLang', this.props.run._id, this.state.lang, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      } else {
        this.props.history.push('/ask');
      }
    })
  }

  renderUserInfo() {
    const { classes, currentUser } = this.props;
    // console.log(currentUser);

    const { intro, playingStatus, currentTrack } = this.state;
    return (
      <div>
        {currentUser ?
          <Grow in={true}>
            <Grid container justify="flex-end" alignItems="flex-end">
              <Avatar alt={currentUser.profile.name} src={currentUser.profile.image} className={`${classes.avatar} webcam-filter`} />
              <div className={classes.usertext}>
                <Typography variant="h6" component="h6">{currentUser.profile.name}</Typography>
                <Typography component="p">{currentUser.profile.organization}</Typography>
              </div>
            </Grid>
          </Grow> : ''}
      </div>
    );
  }

  renderLevels() {
    const steps = this.getLevels();
    const { runStatus, run } = this.props;

    return (
      <div>
        {runStatus ?
          <Grow in={true}>
            <Stepper activeStep={run.level - 1} orientation="horizontal" color="secondary">
              {steps.map((label, index) => (
                <Step key={label}>
                  
                    <StepLabel>{label}</StepLabel>
                  
                </Step>
              ))}
            </Stepper>
          </Grow> : ''}
      </div>
    );
  }

  renderQuestion() {
    const { question, selected } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {question.length == 1 ?
          <Grow in={true}>
            <div>
              {
                question.map((q) => {
                  return (
                    <Grid container justify="center" alignItems="center" key={q._id} className={classes.question}>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <p><b>{q.question}</b></p>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <p className={classes.extra}>{q.extra ? q.extra : ''}</p>
                      </Grid>

                      <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid>
                          <FormControlLabel
                            value="1"
                            control={
                              <Radio
                                onChange={this.onChangeAnswer}
                                checked={selected == 1} />
                            }
                            label={q.answers[0]}
                            labelPlacement="end"
                          />
                        </Grid>
                        <Grid>
                          <FormControlLabel
                            value="2"
                            control={
                              <Radio
                                onChange={this.onChangeAnswer}
                                checked={selected == 2} />
                            }
                            label={q.answers[1]}
                            labelPlacement="end"
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid>
                          <FormControlLabel
                            value="3"
                            control={
                              <Radio
                                onChange={this.onChangeAnswer}
                                checked={selected == 3} />
                            }
                            label={q.answers[2]}
                            labelPlacement="end"
                          />
                        </Grid>
                        <Grid>
                          <FormControlLabel
                            value="4"
                            control={
                              <Radio
                                onChange={this.onChangeAnswer}
                                checked={selected == 4} />
                            }
                            label={q.answers[3]}
                            labelPlacement="end"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              }
            </div>
          </Grow> : ''}
      </div>
    );
  }

  renderTimer() {
    const { question } = this.state;

    return (
      <div>
        {question.length == 1 ?
          <Grow in={true}>
          <div className={this.props.classes.timer}>
          <LinearProgress color="secondary" variant="determinate" value={this.normalise(this.state.time)} />
          {this.normalise(this.state.time) > 100 ? this.timeUp() : ''}
          </div>
          </Grow> : ''}
      </div>
    );
  }



  render() {
    const { classes, currentUser, qLoading } = this.props;
    const { intro, lang, currentTrack, playingStatus } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div>
            {this.renderUserInfo()}
            {this.renderLevels()}
            {this.renderTimer()}
            {this.renderQuestion()}
          </div>
          <Sound
            url={currentTrack}
            playStatus={playingStatus}
            volume={100}
            onFinishedPlaying={this.onFinishedPlaying}
            //loop={false}
          />
          <Snackbars onRef={ref => (this.child = ref)} />
        </Paper>
      </div>
    );
  }
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const handle = Meteor.subscribe('activeRun');

  return {
    currentUser: Meteor.user(),
    runStatus: handle.ready(),
    run: RunCol.findOne({}),
  };
})(withStyles(styles)(MainIntro));
