import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from './api';

let Header = connect(({login_form}) => {return {login_form};})((props) => {
  function update_form(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data
    });
  }
  let {session, login_form} = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" name="email" value={login_form.email} onChange={update_form} placeholder="email" />
      <input type="password" name="password" value={login_form.password} onChange={update_form} placeholder="password" />
      <button className="btn btn-secondary" onClick={() => {api.make_session(login_form.email, login_form.password)}}>Login</button>
    </div>;
  }
  else {
    session_info = <div className="my-2">
      <p>Logged in as {session.user}</p>
    </div>
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1>Task Tracker</h1>
    </div>
    <div className="col-4">
      <p>
        <Link to={"/"}>Tasks</Link> &nbsp; | &nbsp;
        <Link to={"/users"}>Users</Link>
      </p>
    </div>
    <div className="col-4">
      {session_info}
    </div>
  </div>;
});

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(Header);
