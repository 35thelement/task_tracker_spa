# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

hash = Argon2.hash_pwd_salt("passwd")

alias TaskTrackerSpa.Repo
alias TaskTrackerSpa.Users.User
alias TaskTrackerSpa.Tasks.Task
alias TaskTrackerSpa.Times.Time

masahiro = Repo.insert!(%User{email: "m.sakurai@nintendo.net", name: "Masahiro Sakurai", password_hash: hash, admin: true})
todd = Repo.insert!(%User{email: "buyskyrimpls@bethesda.org", name: "Todd Howard", password_hash: hash, admin: true})
task = Repo.insert!(%Task{name: "Create Skyrim for Toasters", description: "Make a version of Skyrim that is playable on a toaster oven.", finished: false, user: todd})
task2 = Repo.insert!(%Task{name: "Make more DLC for Super Smash Bros.", description: "Put Banjo-Kazooie, Geno, and Goku in Smash.", finished: false, user: masahiro})
Repo.insert!(%Time{user: todd, task: task, minutes: 30})
Repo.insert!(%Time{user: masahiro, task: task, minutes: 15})
