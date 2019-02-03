import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AutoForm from 'uniforms/AutoForm';
import AutoField from 'uniforms-material/AutoField';

import QuestionCol from './../../../api/schemas/questionSchema';
import Header from './Header.jsx';
import Table from './../../components/QTable.jsx';
import dashboardStyle from './../../material-styles/dashboard';
import Snackbars from '../../components/Snack.jsx';
import questionForm from './../../simpleSchma/questionForm';

class Question extends React.Component {
  state = {
    formOpen: false,
    loading: false,
  }

  handleFormOpen = () => {
    this.setState({ formOpen: true });
  };

  handleFormClose = () => {
    this.setState({ formOpen: false });
  };

  handleSubmit(doc) {
    this.setState({ loading: true });
    console.log(doc);
    Meteor.call('question.insert', doc, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      } else {
        this.child.handleClick('success', 'Question was successfully added');
      }
      this.setState({ loading: false });
      this.formRef.reset();
    });
  }


  render() {
    const { classes, questions } = this.props;
    const { formOpen, loading } = this.state;
console.log(questions);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header title="Questions" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div>
            <center>
              <Button variant="outlined" color="primary" onClick={this.handleFormOpen}>
                + Add Question
              </Button>
            </center>

            <Dialog
              open={formOpen}
              onClose={this.handleFormClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Questions</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make sure to select suitable selections. 
            </DialogContentText>

                <AutoForm schema={questionForm}
                  onSubmit={doc => this.handleSubmit(doc)} ref={(e) => { this.formRef = e; }}>
                  <div className={classes.qForm}>
                    <Grid container spacing={24}>
                      <FormControl margin="normal" required fullWidth>
                        <AutoField name="question" />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <AutoField name="answers" />
                      </FormControl>

                      <Grid item xs={4}>
                        <AutoField name="correct" />
                      </Grid>
                      <Grid item xs={4}>
                        <AutoField name="level" />
                      </Grid>
                      <Grid item xs={4}>
                        <AutoField name="lang" />
                      </Grid>
                      <FormControl margin="normal" required fullWidth>
                        <AutoField name="extra" />
                      </FormControl>
                      <div className={classes.wrapper} >
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={loading}
                          type="submit"
                        >Add Question</Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </Grid>
                  </div>
                </AutoForm>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleFormClose} color="primary">
                  Close
            </Button>
              </DialogActions>
            </Dialog>
          </div>

          <Typography variant="h4" gutterBottom component="h3">
            Questions
          </Typography>
          <div className={classes.tableContainer}>
            <Table data={questions} />
          </div>
          <Snackbars onRef={ref => (this.child = ref)} />
        </main>
      </div>
    );
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const handle = Meteor.subscribe('questions');

  return {
    currentUser: Meteor.user(),
    qLoading: !handle.ready(),
    questions: QuestionCol.find({}).fetch(),
  };
})(withStyles(dashboardStyle)(Question));
