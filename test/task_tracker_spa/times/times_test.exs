defmodule TaskTrackerSpa.TimesTest do
  use TaskTrackerSpa.DataCase

  alias TaskTrackerSpa.Times

  describe "times" do
    alias TaskTrackerSpa.Times.Time

    @valid_attrs %{minutes: 42}
    @update_attrs %{minutes: 43}
    @invalid_attrs %{minutes: nil}

    def time_fixture(attrs \\ %{}) do
      {:ok, time} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Times.create_time()

      time
    end

    test "list_times/0 returns all times" do
      time = time_fixture()
      assert Times.list_times() == [time]
    end

    test "get_time!/1 returns the time with given id" do
      time = time_fixture()
      assert Times.get_time!(time.id) == time
    end

    test "create_time/1 with valid data creates a time" do
      assert {:ok, %Time{} = time} = Times.create_time(@valid_attrs)
      assert time.minutes == 42
    end

    test "create_time/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Times.create_time(@invalid_attrs)
    end

    test "update_time/2 with valid data updates the time" do
      time = time_fixture()
      assert {:ok, %Time{} = time} = Times.update_time(time, @update_attrs)
      assert time.minutes == 43
    end

    test "update_time/2 with invalid data returns error changeset" do
      time = time_fixture()
      assert {:error, %Ecto.Changeset{}} = Times.update_time(time, @invalid_attrs)
      assert time == Times.get_time!(time.id)
    end

    test "delete_time/1 deletes the time" do
      time = time_fixture()
      assert {:ok, %Time{}} = Times.delete_time(time)
      assert_raise Ecto.NoResultsError, fn -> Times.get_time!(time.id) end
    end

    test "change_time/1 returns a time changeset" do
      time = time_fixture()
      assert %Ecto.Changeset{} = Times.change_time(time)
    end
  end
end
