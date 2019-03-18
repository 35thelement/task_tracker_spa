defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :description, :string
    field :finished, :boolean, default: false
    field :name, :string
    belongs_to :user, TaskTrackerSpa.Users.User
    has_many :tasks, TaskTrackerSpa.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :finished])
    |> validate_required([:name, :description, :finished])
  end
end
