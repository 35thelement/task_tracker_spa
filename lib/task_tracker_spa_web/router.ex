defmodule TaskTrackerSpaWeb.Router do
  use TaskTrackerSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerSpaWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/users", PageController, :index
  end

  scope "/api", TaskTrackerSpaWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    resources "/times", TimeController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTrackerSpaWeb do
  #   pipe_through :api
  # end
end
