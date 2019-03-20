import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

export default connect(({users}) => {return {users};})((props) => {
  let rows = _.map(props.users, (u) => <User key={u.id} user={u} />);
  return (
    <div className="row">
    <div className="col-12">
    <table className="table table-striped">
    <thead><tr><th>ID</th><th>Email</th><th>Name</th><th>Admin?</th></tr></thead>
    <tbody>{rows}</tbody>
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
