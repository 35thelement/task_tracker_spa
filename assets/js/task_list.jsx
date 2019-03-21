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
  function update_new_task(ev) {
    let target = $(ev.target);
    let new_task = {};
    new_task[target.attr('name')] = target.val();
    let action = {
      type: 'UPDATE_ADD_TASK_FORM',
      data: new_task
    };
    dispatch(action);
  }
  return (
    <div className="row">
    <div className="col-12">
    <table className="table table-striped">
    <thead>
    <tr><td><button className="btn btn-primary m-1" onClick={() => api.make_task()}>Add Task</button></td>
    <td><textarea className="form-control m1" placeholder="new task name" name="name" onChange={update_new_task} /></td>
    <td><textarea className="form-control m1" placeholder="new task description" name="description" onChange={update_new_task} /></td>
    <td><input type="number" className="form-control m1" placeholder="assign to" name="user_id" onChange={update_new_task} /></td></tr>
    <tr><th>ID</th><th>Task Name</th><th>Description</th><th>Assigned to User ID</th><th>Finished?</th><th></th><th></th></tr></thead>
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
  function update_time(ev) {
    let action = {
      type: 'UPDATE_ADD_TIME_FORM',
      task_id: task.id,
      minutes: ev.target.value
    };
    dispatch(action);
  }
  function update_task(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    let action = {
      type: 'UPDATE_PUT_TASK_FORM',
      task_id: task.id,
      data: data
    };
    dispatch(action);
  }
  return (
    <tr>
    <td>{task.id}</td>
    <td>{task.name}</td>
    <td>{task.description}</td>
    <td>
    <input type="number" name="user_id" className="form-control m-1" value={task.user_id} onChange={update_task} />
    <button className="btn btn-primary m-1"
    onClick={() => api.put_task(task.id,
      {name: task.name, description: task.description, finished: task.finished, user_id: task.user_id}
    )}>Assign</button>
    </td>
    <td><input type="checkbox" name="finished" className="form-control m-1" value={task.finished} onChange={update_task}/></td>
    <td>
    <div className="form">
    <div className="form-group">
    <input type="number" className="form-control m-1" value={minutes} onChange={update_time} />
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
    new_task: state.make_task_form,
    tasks: state.tasks,
    mins: state.make_time_forms
  };
}

export default connect(state2props)(TaskList);
