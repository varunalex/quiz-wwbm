import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoForm from 'uniforms/AutoForm';
import AutoField from 'uniforms-material/AutoField';

import Snackbars from '../components/Snack.jsx';
import registerForm from '../simpleSchma/registerForm';
import formStyles from './../material-styles/form';

class Register extends React.Component {
  state = {
    loading: false,
    success: false,
  };
  constructor(props) {
    super(props);

    // Binds
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(doc) {
    console.log(doc);
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          Meteor.call('user.create', doc, (err, res) => {
            if (res) {
              // Login
              Meteor.loginWithPassword(doc.username, 'user123', (err) => {
                if (err) {
                  // Trigger snackbar
                  console.log(this.child);
                  
                  this.child.handleClick('error', err.reason);
                } else {
                  this.props.history.replace('/selfie');
                }
              });
              this.setState({ success: true, loading: true });
            } else {
              this.setState({ success: false, loading: false });
            }
            this.formRef.reset();
          });
        },
      );
    }
  }
  render() {
    const { classes } = this.props;
    const { loading, success } = this.state;
    
    return(
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <AutoForm schema={registerForm} className={classes.form}
        onSubmit={doc => this.handleSubmit(doc)} ref={(e) => { this.formRef = e; }}>
          <FormControl margin="normal" required fullWidth>
            <AutoField name="username" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AutoField name="name" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AutoField name="organization" />
          </FormControl>
          <div className={classes.wrapper} >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            type="submit"
          >Sign Up</Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
          </div>
        </AutoForm>
        <Snackbars onRef={ref => (this.child = ref)} />
      </Paper>
    </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(formStyles)(Register);