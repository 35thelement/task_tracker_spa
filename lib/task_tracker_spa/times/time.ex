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
    |> validate_number(:minutes, greater_than: -1)
    |> validate_change(:minutes, fn :minutes, minutes ->
      if rem(minutes, 15) > 0 do
        [minutes: "must be a multiple of 15"]
      else
        []
      end
    end)
  end
end
