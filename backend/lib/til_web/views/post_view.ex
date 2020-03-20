defmodule TilWeb.PostView do
  use TilWeb, :view
  alias Til.Repo

  def render("index.json", %{posts: posts}) do
    posts
    |> Enum.map(&serialize_post/1)
  end

  def render("show.json", %{post: post}) do
    post
    |> serialize_post
  end

  defp serialize_post(post) do
    %{
      data: %{
        id: post.id,
        title: post.title,
        body: post.body,
        isPublic: post.is_public,
        likesCount: post.likes_count,
        author: render(TilWeb.UserView, "show.json", user: post.author),
        categoriesIds: Enum.map(post.categories, & &1.id)
      }
    }
  end
end
