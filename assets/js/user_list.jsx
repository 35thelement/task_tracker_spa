import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';

export default connect(({users}) => {return {users};})((props) => {
  function updateReg(ev) {
    let target = $(ev.target);
    let new_user = {};
    new_user[target.attr('name')] = target.val();
    let action = {
      type: 'UPDATE_REGISTRATION_FORM',
      data: new_user
    }
    props.dispatch(action);
  }
  let rows = _.map(props.users, (u) => <User key={u.id} user={u} />);
  return (
    <div className="row">
    <div className="col-12">
    <table className="table table-striped">
    <thead>
    <tr><td><button className="btn btn-primary m-1" onClick={() => api.make_user()}>Register</button></td>
    <td><input type="text" className="form-control m1" name="email" placeholder="new user email" onChange={updateReg} /></td>
    <td><input type="text" className="form-control m1" name="name" placeholder="new user name" onChange={updateReg} /></td>
    <td><input type="text" className="form-control m1" name="password_hash" placeholder="new user password" onChange={updateReg} /></td></tr>
    <tr><th>ID</th><th>Email</th><th>Name</th><th>Admin?</th></tr>
    </thead>
    <tbody>
    {rows}
    </tbody>
    </table>
    </div>
    </div>
  );
});

function User(props) {
  let {user} = props;
  return (
    <tr>
    <td>{user.id}</td>
    <td>{user.email}</td>
    <td>{user.name}</td>
    <td>{user.admin ? "Y" : "N"}</td>
    </tr>
  );
}
