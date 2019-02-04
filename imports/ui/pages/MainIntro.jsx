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
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import RunCol from '../../api/schemas/runSchema';
import Intro from '../components/animation/Intro.jsx';
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
    padding: theme.spacing.unit * 1.5,
    margin: 'auto',
    maxWidth: 900,
    height: 500,
  },
  avatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  langGrid: {
    marginTop: 100,
  }
});

class MainIntro extends React.Component {
  state = {
    intro: true,
    playingStatus: Sound.status.PLAYING,
    currentTrack: `${Meteor.absoluteUrl()}sounds/intro.mp3`,
    lang: 'Si',
  };
  constructor(props) {
    super(props);
    // binds
    this.onStopIntro = this.onStopIntro.bind(this);
    this.renderIntro = this.renderIntro.bind(this);
    this.onChangeLang = this.onChangeLang.bind(this);
    this.clickStart = this.clickStart.bind(this);
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ soundStatus: Sound.status.STOPPED });
    // }, 5000);
    // setTimeout(() => {
    //   this.setState({ currentTrack: `${Meteor.absoluteUrl()}sounds/falsch.mp3`, soundStatus: Sound.status.PLAYING });
    // }, 6000);
  }

  onStopIntro() {
    this.setState({ intro: false, playStatus: Sound.status.STOPPED });
  }

  onChangeLang(e) {
    this.setState({ lang: e.target.value });
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

  renderIntro() {
    const { classes, currentUser } = this.props;
    const { intro, playingStatus, currentTrack } = this.state;
    return (
      <div>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Grid container justify="center" alignItems="center">
            <Typography component="h1" variant="h2" color='primary'>
              Welcome to the game
        </Typography>
          </Grid>
        </Slide>
        {currentUser ?
          <div>
            <Grow in={true}>
              <Grid container justify="center" alignItems="center">
                <Avatar alt={currentUser.profile.name} src={currentUser.profile.image} className={`${classes.avatar} webcam-filter`} />
              </Grid>
            </Grow>
            <br />
            <Grid container justify="center" alignItems="center">
              <Intro userName={currentUser ? currentUser.profile.name : ''} />
            </Grid>
          </div>

          : ''}
        <Sound
          url={currentTrack}
          playStatus={playingStatus}
          volume={100}
          onFinishedPlaying={this.onStopIntro}
          loop={false}
        />
      </div>
    );
  }



  render() {
    const { classes, currentUser } = this.props;
    const { intro, lang } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {/* Into start */}
          {intro ? this.renderIntro() : ''}

          {/* Intro End */}

          {!intro ? <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div>
              <Grid container justify="center" alignItems="center" className={classes.langGrid}>
                <FormControlLabel
                  value='Si'
                  control={
                    <Radio
                      color="primary"
                      onChange={this.onChangeLang}
                      checked={lang === 'Si'} />
                  }
                  label="සිංහල"
                  labelPlacement="start"
                /> &nbsp;&nbsp;&nbsp;&nbsp;
            <FormControlLabel
                  value="En"
                  control={
                    <Radio
                      color="primary"
                      onChange={this.onChangeLang}
                      checked={lang === 'En'} />
                  }
                  label="English"
                  labelPlacement="end"
                />
                
              </Grid>
              <br /><br />
              <Grid container justify="center" alignItems="center">
                <Button variant="contained" variant="outlined" size="large" color="secondary"
                  onClick={this.clickStart}>
                  Start
            </Button>
              </Grid>
            </div>

          </Slide> : ''}
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
    qLoading: !handle.ready(),
    run: RunCol.findOne({}),
  };
})(withStyles(styles)(MainIntro));
