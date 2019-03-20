import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';

function TaskList(props) {
  let {tasks, mins, dispatch} = props;
  let todos = _.map(tasks, (t) => {
    let min = mins.get(t.id) || 0;
    return <Task key={t.id} task={t} minutes={min} dispatch={dispatch} />
  });
  function update(ev) {
    let action = {
      type: 'UPDATE_ADD_TASK_FORM',
      task: task
    }
  }
  return (
    <div className="row">
    <div className="col-12">
    <table className="table table-striped">
    <thead><tr><th>ID</th><th>Task Name</th><th>Description</th><th>Finished?</th><th></th><th></th></tr></thead>
    <tbody>
    {todos}
    </tbody>
    </table>
    </div>
    </div>
  );
}

function Task(props) {
  let {task, minutes, dispatch} = props;
  function update(ev) {
    let action = {
      type: 'UPDATE_ADD_TIME_FORM',
      task_id: task.id,
      minutes: ev.target.value
    };
    dispatch(action);
  }
  return (
    <tr>
    <td>{task.id}</td>
    <td>{task.name}</td>
    <td>{task.description}</td>
    <td>{task.finished ? "Y" : "N"}</td>
    <td>
    <div className="form">
    <div className="form-group">
    <input type="number" className="form-control m-1" value={minutes} onChange={update} />
    <button className="btn btn-primary m-1" onClick={() => api.make_time(task.id)}>Report Minutes</button>
    </div>
    </div>
    </td>
    <td><button className="btn btn-danger m-1" onClick={() => api.delete_task(task.id)}>X</button></td>
    </tr>
  );
}

function state2props(state) {
  console.log("rendering", state);
  return {
    tasks: state.tasks,
    mins: state.make_time_forms
  };
}

export default connect(state2props)(TaskList);
