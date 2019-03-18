defmodule TaskTrackerSpaWeb.TimeController do
  use TaskTrackerSpaWeb, :controller

  alias TaskTrackerSpa.Times
  alias TaskTrackerSpa.Times.Time

  action_fallback TaskTrackerSpaWeb.FallbackController

  def index(conn, _params) do
    times = Times.list_times()
    render(conn, "index.json", times: times)
  end

  def create(conn, %{"time" => time_params}) do
    with {:ok, %Time{} = time} <- Times.create_time(time_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.time_path(conn, :show, time))
      |> render("show.json", time: time)
    end
  end

  def show(conn, %{"id" => id}) do
    time = Times.get_time!(id)
    render(conn, "show.json", time: time)
  end

  def update(conn, %{"id" => id, "time" => time_params}) do
    time = Times.get_time!(id)

    with {:ok, %Time{} = time} <- Times.update_time(time, time_params) do
      render(conn, "show.json", time: time)
    end
  end

  def delete(conn, %{"id" => id}) do
    time = Times.get_time!(id)

    with {:ok, %Time{}} <- Times.delete_time(time) do
      send_resp(conn, :no_content, "")
    end
  end
end
