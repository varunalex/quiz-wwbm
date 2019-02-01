import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoForm from 'uniforms/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import SubmitField from 'uniforms-material/SubmitField';

import registerForm from '../simpleSchma/registerForm'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Register(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <AutoForm schema={registerForm}className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <AutoField name="username" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AutoField name="name" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AutoField name="organization" />
          </FormControl>
          <SubmitField
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="Signin"
          />
        </AutoForm>
      </Paper>
    </main>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);