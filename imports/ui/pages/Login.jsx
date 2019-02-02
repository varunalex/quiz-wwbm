import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoForm from 'uniforms/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import SubmitField from 'uniforms-material/SubmitField';

import loginForm from '../simpleSchma/loginForm';
import formStyles from './../material-styles/form';

function SignIn(props) {
  const { classes } = props;

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
        <AutoForm schema={loginForm}className={classes.form}>
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
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(formStyles)(SignIn);