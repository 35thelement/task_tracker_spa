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

  make_task() {
    let state = tracker.getState();
    let data = state.make_task_form;
    console.log("making new task", state);
    this.make_post("/api/tasks", {task: data},
    (resp) => {
      this.get_tasks();
    });
  }

  make_user() {
    let state = tracker.getState();
    let data  = state.registration_form;
    console.log("making new user", state);
    this.make_post("/api/users", {user: data},
    (resp) => {
      this.get_users();
    });
  }

  do_put(path, data, callback) {
    $.ajax(path, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback
    });
  }

  put_task(task_id, new_task_data) {
    console.log("updating task");
    this.do_put("/api/tasks/" + task_id, {task: new_task_data},
    (resp) => {
      this.get_tasks();
    });
  }

  delete_task(id) {
    $.ajax("/api/tasks/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        tracker.dispatch({
          type: 'TASK_DELETE',
          task_id: id
        });
      }
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
