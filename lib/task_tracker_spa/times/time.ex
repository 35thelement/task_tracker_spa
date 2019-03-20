defmodule TaskTrackerSpa.Times.Time do
  use Ecto.Schema
  import Ecto.Changeset

  schema "times" do
    field :minutes, :integer
    belongs_to :user, TaskTrackerSpa.Users.User
    belongs_to :task, TaskTrackerSpa.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(time, attrs) do
    time
    |> cast(attrs, [:minutes, :user_id, :task_id])
    |> validate_required([:minutes, :user_id, :task_id])
  end
end
