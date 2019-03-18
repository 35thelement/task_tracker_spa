defmodule TaskTrackerSpa.Repo.Migrations.AddPasswords do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :passwd_tries, :integer, null: false, default: 0
      add :passwd_last_attempt, :utc_datetime
    end
  end
end
