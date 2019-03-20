defmodule TaskTrackerSpaWeb.PageController do
  use TaskTrackerSpaWeb, :controller

  def index(conn, _params) do
    tasks = TaskTrackerSpa.Tasks.list_tasks()
    |> Enum.map(fn t ->
      TaskTrackerSpaWeb.TaskView.render("task.json", %{task: t})
    end)

    users = TaskTrackerSpa.Users.list_users()
    |> Enum.map(fn u ->
      TaskTrackerSpaWeb.UserView.render("user.json", %{user: u})
    end)
    render conn, "index.html", tasks: tasks, users: users
  end
end
