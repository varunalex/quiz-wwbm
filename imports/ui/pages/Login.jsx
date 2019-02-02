import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoForm from 'uniforms/AutoForm';
import AutoField from 'uniforms-material/AutoField';

import loginForm from '../simpleSchma/loginForm';
import formStyles from './../material-styles/form';
import Snackbars from '../components/Snack.jsx';

class SignIn extends React.Component {
  state = {
    loading: false,
  };
  constructor(props) {
    super(props);

    // Bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(doc) {
    this.setState({ loading: true });
    // Login
    Meteor.loginWithPassword(doc.username, doc.password, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
        this.setState({ loading: false });
      } else {
        this.props.history.replace('/dashboard');
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <AutoForm schema={loginForm} className={classes.form}
          onSubmit={doc => this.handleSubmit(doc)} ref={(e) => { this.formRef = e; }} >
            <FormControl margin="normal" required fullWidth>
              <AutoField name="username" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <AutoField name="password" type="password"/>
            </FormControl>
            <div className={classes.wrapper} >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
            >Sign In</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
            </div>
          </AutoForm>
          <Snackbars onRef={ref => (this.child = ref)} />
        </Paper>
      </main>
    );
  }
}


SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(formStyles)(SignIn);