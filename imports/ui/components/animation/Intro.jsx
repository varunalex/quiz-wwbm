import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({

});

class Intro extends React.Component {
  state = {
    checked: false,
    loop: 0,
    text: ''
  };
  constructor(props) {
    super(props);
    this.timer;
  }

  componentDidMount() {
    console.log('mounted');

    this.timer = setInterval(() => {
      const now = this.state.loop;
      let text = "";

      if (now % 2) {
        if (now <= 1) text = "Hello! " + this.props.userName + " 👋";
        else if (now <= 3) text = "Preparing your questions 🙌";
        else if (now <= 5) text = "Get Ready 👌";
        else if (now <= 7) text = "Good Luck 👍";
        this.setState({ loop: now + 1, checked: true, text: text });
      } else {
        this.setState({ loop: now + 1, checked: false, text: '' });
      }

    }, 2000);
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked, loop, text } = this.state;
    //console.log(loop, text);
    if (loop == 8) clearInterval(this.timer);


    return (
      <Fade in={checked}>
        <Typography component="h1" variant="h4">
          {text}
          <br /><br />
          <center>
            {loop > 6 ? <CircularProgress className={classes.progress} color="secondary" /> : ''}
          </center>
        </Typography>
      </Fade>
    );
  }
}

Intro.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
};

export default withStyles(styles)(Intro);
