defmodule TilWeb.PostView do
  use TilWeb, :view
  alias Til.Repo

  def render("index.json", %{posts: posts}) do
    posts
    |> Enum.map(&serialize_post/1)
  end

  def render("index_with_nested.json", %{posts: posts}) do
    posts
    |> Enum.map(fn post -> serialize_post(post, :nested) end)
  end

  def render("show.json", %{post: post}) do
    post
    |> serialize_post()
  end

  def render("show_with_nested.json", %{post: post}) do
    post
    |> serialize_post(:nested)
  end

  defp serialize_post(post, :nested) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      isPublic: post.is_public,
      reactionCount: post.reaction_count,
      reactions: render(TilWeb.ReactionView, "index.json", reactions: post.reactions),
      author: render(TilWeb.UserView, "show.json", user: post.author),
      categories: Enum.map(post.categories, & &1.name)
    }
  end

  defp serialize_post(post) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      isPublic: post.is_public,
      reactionCount: post.reaction_count
    }
  end
end
