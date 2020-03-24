defmodule Til.Activities.Like do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.Accounts.User
  alias Til.ShareableContent.Post

  schema "likes" do
    belongs_to(:user, User)
    belongs_to(:post, Post)
    timestamps()
  end

  def changeset(sender, attrs) do
    sender
    |> cast(attrs, [:user_id, :post_id])
    |> validate_required([:user_id, :post_id])
  end
end
