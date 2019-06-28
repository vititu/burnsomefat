import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import Message from './Message';

function Main() {
  return (
    <Router>
      <Route
        path="/"
        render={({ location: { search } }) => {
          if (search === '?message') {
            return <Message />;
          }
          return <App />;
        }}
      />
    </Router>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
