import tracker from './tracker';

class OurServer {
  get_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback
    });
  }

  get_tasks() {
    this.get_path("/api/tasks",
    (resp) => {
      tracker.dispatch({
        type: 'TASK_LIST',
        data: resp.data
      });
    });
  }

  get_users() {
    this.get_path("/api/users",
    (resp) => {
      tracker.dispatch({
        type: 'USER_LIST',
        data: resp.data
      });
    });
  }

  get_times() {
    this.get_path("/api/times",
    (resp) => {
      tracker.dispatch({
        type: 'TIME_LIST',
        data: resp.data
      });
    });
  }

  make_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback
    });
  }

  make_session(email, password) {
    this.make_post("/api/auth", {email, password},
    (resp) => {
      tracker.dispatch({
        type: 'NEW_SESSION',
        data: resp.data
      });
    });
  }

  make_time(task_id) {
    let state = tracker.getState();
    let user_id = state.session.user_id;
    let minutes = state.make_time_forms.get(task_id) || 0;
    console.log("making new time block", state);
    this.make_post("/api/times", {time: {task_id, user_id, minutes}},
    (resp) => {
      this.get_times();
    });
  }

  delete_time(id) {
    $.ajax("/api/times/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        tracker.dispatch({
          type: 'TIME_DELETE',
          time_id: id
        });
      }
    });
  }
}

export default new OurServer();
