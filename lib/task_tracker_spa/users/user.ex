defmodule TaskTrackerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :admin, :boolean, default: false
    field :email, :string
    field :name, :string
    field :password_hash, :string
    has_many :tasks, TaskTrackerSpa.Tasks.Task
    has_many :times, TaskTrackerSpa.Times.Time

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    true_hash = Argon2.hash_pwd_salt(Map.get(attrs, "password_hash"))
    attrs = Map.replace(attrs, "password_hash", true_hash)
    user
    |> cast(attrs, [:email, :name, :password_hash, :admin])
    |> validate_required([:email, :name, :password_hash, :admin])
    |> unique_constraint(:email)
  end
end
