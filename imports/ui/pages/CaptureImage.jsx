import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import CameraEnhanceOutlined from '@material-ui/icons/CameraEnhanceOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Webcam from "react-webcam";

import formStyles from './../material-styles/form';
import TakeSelfie from './../components/animation/TakeSelfie.jsx';
import Snackbars from '../components/Snack.jsx';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10,
  },
});

class CaptureImage extends React.Component {
  state = { imageSrc: '', captured: false, stream: false }
  constructor(props) {
    super(props);

    this.onUserMedia = this.onUserMedia.bind(this);
    this.clickStart = this.clickStart.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    this.setState({ imageSrc: imageSrc });

    Meteor.call('user.image', imageSrc, (err, res) => {
      this.setState({ captured: true });
    });
  };

  onUserMedia() {
    this.setState({ stream: true });
  }

  onUserMediaError() {
    this.child.handleClick('warning', 'You need allow camera permission to continue. Please click allow and refresh the page.');
  }

  clickStart() {
    const data = {
      user_id: Meteor.userId(),
      level: 1,
      time: 0
    }
    this.child.handleClick('info', 'Almost there. Please wait');
    Meteor.call('run.insert', data, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      } else {
        this.props.history.push('/intro');
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { imageSrc, captured, stream } = this.state;

    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: "user"
    };

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {stream ? <TakeSelfie clickSelfie={this.capture} /> : 
          <Typography component="h2" variant="h5">Waiting to see you!</Typography>
        }

          {imageSrc ?
            <div>
              <img src={imageSrc} className="webcam-filter" alt="" />
              <center>
                {captured ? '' :
                  <Typography component="h2" variant="h5">Saving Your Snap ...</Typography>
                }
              </center>
            </div> :

            <div className="webcam-wrap">
              <Webcam
                audio={false}
                height={300}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}
                className="webcam-filter"
                onUserMedia={this.onUserMedia}
                onUserMediaError={this.onUserMediaError}
              />
            </div>
          }
          {captured ?
            <center>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.clickStart}
              >Let's Start</Button>
            </center>
            :
            <Avatar className={classes.avatar}>
              <CameraEnhanceOutlined />
            </Avatar>
          }

          <Snackbars onRef={ref => (this.child = ref)} />
        </Paper>
      </main>
    );
  }
}

CaptureImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(formStyles)(CaptureImage);