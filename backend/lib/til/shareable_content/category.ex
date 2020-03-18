defmodule Til.ShareableContent.Category do
  use Ecto.Schema
  import Ecto.Changeset
  alias Til.ShareableContent.Post

  schema "categories" do
    field :name, :string

    many_to_many(
      :posts,
      Post,
      join_through: "posts_categories",
      on_replace: :delete
    )
  end

  def changeset(post, attrs) do
    post
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
