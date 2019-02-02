import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';


const styles = theme => ({

});

class TakeSelfie extends React.Component {
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
      if(now == 6) this.props.clickSelfie();
      
      if(now % 2) {
        if(now == 1) text = "You Look so Nice!";
        if(now == 3) text = "Let me Take a Selfie";
        if(now == 5) text = "Smile 😁";
        this.setState({loop: now + 1, checked: true, text: text});
      } else {
        this.setState({loop: now + 1, checked: false, text: '' });
      }
      
    }, 1000);
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked, loop, text } = this.state;
    //console.log(loop, text);
    if(loop == 7) clearInterval(this.timer);
    

    return (
      <Zoom in={checked}>
        <Typography component="h1" variant="h5">
          {text} &nbsp;
        </Typography>
      </Zoom>
    );
  }
}

TakeSelfie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TakeSelfie);