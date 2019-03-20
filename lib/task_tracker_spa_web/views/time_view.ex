defmodule TaskTrackerSpaWeb.TimeView do
  use TaskTrackerSpaWeb, :view
  alias TaskTrackerSpaWeb.TimeView

  def render("index.json", %{times: times}) do
    %{data: render_many(times, TimeView, "time.json")}
  end

  def render("show.json", %{time: time}) do
    %{data: render_one(time, TimeView, "time.json")}
  end

  def render("time.json", %{time: time}) do
    %{id: time.id,
      minutes: time.minutes,
      user: time.user_id,
      task: time.task_id}
  end
end
