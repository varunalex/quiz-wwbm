import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import App from './../ui/App';

class RootRouter extends Component {
  render() {
    return(
      <Router>
        <App />
      </Router>
    );
  }
}

export default RootRouter;
