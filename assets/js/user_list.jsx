import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

export default connect(({users}) => {return {users};})((props) => {
  console.log(props);
  function updateReg(ev) {
    let action = {
      type: 'UPDATE_REGISTRATION_FORM'
    }
  }
  let rows = _.map(props.users, (u) => <User key={u.id} user={u} />);
  return (
    <div className="row">
    <div className="col-12">
    <table className="table table-striped">
    <thead>
    <tr><td><button className="btn btn-primary m-1">Register</button></td>
    <td><input type="text" className="form-control m1" placeholder="new user email" onChange={updateReg} /></td>
    <td><input type="text" className="form-control m1" placeholder="new user name" onChange={updateReg} /></td>
    <td><input type="text" className="form-control m1" placeholder="new user password" onChange={updateReg} /></td></tr>
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
