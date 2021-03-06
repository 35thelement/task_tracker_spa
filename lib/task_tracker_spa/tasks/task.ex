defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :description, :string
    field :finished, :boolean, default: false
    field :name, :string
    belongs_to :user, TaskTrackerSpa.Users.User
    has_many :times, TaskTrackerSpa.Times.Time

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :finished, :user_id])
    |> validate_required([:name, :description, :finished])
  end
end
