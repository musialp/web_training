import React, { Component } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
              <ul style={{ listStyle: 'none', margin: 'auto', padding: '0' }}>
                <li style={{ margin: '10px', display: 'inline-block' }}>
                  <NavLink to="/courses">Courses</NavLink>
                </li>
                <li style={{ margin: '10px', display: 'inline-block' }}>
                  <NavLink to="/users">Users</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/courses" component={Courses} />
            <Route path="/users" component={Users} />
            <Redirect from="/all-courses" to="/courses" />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
