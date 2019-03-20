import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header'
import Times from './times'
import TaskList from './task_list'
import UserList from './user_list'

export default function root_init(node, tracker) {
  let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={tracker}>
      <Root tasks={tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    api.get_tasks();
    api.get_users();
    api.get_times();
  }

  render() {
    return (
      <div>
      <Router>
      <div>
      <Header />
      <div className="row">
      <div className="col-8">
      <Route path="/" exact={true} render={() => <TaskList />} />
      <Route path="/users" exact={true} render={() => <UserList />} />
      </div>
      <div className="col-4">
      <Times />
      </div>
      </div>
      </div>
      </Router>
      </div>
    );
  }
}
