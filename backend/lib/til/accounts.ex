defmodule Til.Accounts do
  import Ecto, warn: false
  alias Til.Repo
  alias Til.Accounts.User

  def get_user(id), do: Repo.get!(User, id)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs |> Map.merge(%{uuid: Ecto.UUID.generate}))
    |> Repo.insert()
  end
end