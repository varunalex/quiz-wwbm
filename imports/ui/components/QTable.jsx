import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbars from './Snack.jsx';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class QTable extends React.Component {
  state = {
    delete: false,
  };
  constructor(props) {
    super(props);
  }

  handleDeleteModOpen = () => {
    this.setState({ delete: true });
  };

  handleDeleteModClose = () => {
    this.setState({ delete: false });
  };

  handleStatus(id, stat) {
    const status = stat == 1 ? 0 : 1;
    this.child.handleClick('info', 'Processing...');
    Meteor.call('question.statusUpdate', id, status, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      } else {
        this.child.handleClick('success', 'Status Updated');
      }
    });
  }

  handleDelete(id) {
    this.child.handleClick('info', 'Processing...');
    this.setState({delete: false});
    Meteor.call('question.deleteQuestion', id, (err) => {
      if (err) {
        // Trigger snackbar
        this.child.handleClick('error', err.reason);
      } else {
        this.child.handleClick('success', 'Question Deleted');
      }
    });
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th"><b>Question</b></TableCell>
              <TableCell component="th"><b>Answers</b></TableCell>
              <TableCell component="th"><b>Correct Answer</b></TableCell>
              <TableCell component="th"><b>Level</b></TableCell>
              <TableCell component="th"><b>Lang</b></TableCell>
              <TableCell component="th"><b>Extra</b></TableCell>
              <TableCell component="th"><b>Status</b></TableCell>
              <TableCell component="th"><b>Options</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => (
              <TableRow key={d._id}>
                <TableCell component="th" scope="row">
                  {d.question}
                </TableCell>
                <TableCell align="left">1. {d.answers[0]}<br />2. {d.answers[1]}<br />3. {d.answers[2]}<br />4. {d.answers[3]}</TableCell>
                <TableCell align="right">{d.correct}. {d.answers[d.correct - 1]}</TableCell>
                <TableCell>{d.level}</TableCell>
                <TableCell>{d.lang}</TableCell>
                <TableCell>{d.extra ? d.extra : ''}</TableCell>
                <TableCell>
                  <Switch
                    checked={!!d.status}
                    onChange={() => this.handleStatus(d._id, d.status)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Delete"
                    color="secondary"
                    onClick={this.handleDeleteModOpen} >
                    <DeleteIcon />
                  </IconButton>

                  <Dialog
                    open={this.state.delete}
                    onClose={this.handleDeleteModClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Confirm !"}</DialogTitle>
                    <DialogActions>
                      <Button onClick={() => this.handleDelete(d._id)} color="primary">
                        Delete
                    </Button>
                      <Button onClick={this.handleDeleteModClose} color="primary" autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbars onRef={ref => (this.child = ref)} />
      </Paper>
    );
  }
}

QTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(QTable);
