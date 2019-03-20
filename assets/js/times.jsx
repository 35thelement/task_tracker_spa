import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import api from './api';

export default connect((state) => {return {times: state.times};})((props) => {
  let {times} = props;
  let rows = _.map(times, (time) =>
  <tr key={time.id}>
  <td>{time.task}</td>
  <td>{time.user}</td>
  <td>{time.minutes}</td>
  <td><button className="btn btn-danger m-1" onClick={() => api.delete_time(time.id)}>X</button></td>
  </tr>);

  return (
    <div>
    <h2>Times</h2>
    <table className="table table-striped">
    <thead>
    <tr><th>Task Name</th><th>User</th><th>Minutes Spent</th><th></th></tr>
    </thead>
    <tbody>
    {rows}
    </tbody>
    </table>
    </div>
  );
});
