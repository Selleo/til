defmodule TilWeb.PostCategoryView do
  use TilWeb, :view

  def render("index.json", %{categories: categories}) do
    categories
    |> Enum.map(&serialize_category/1)
  end

  def render("show.json", %{category: category}) do
    serialize_category(category, :with_posts)
  end

  # private

  defp serialize_category(category) do
    %{
      id: category.id,
      name: category.name,
      position: category.position,
      url: category.url,
      firstText: category.first_text,
      secondText: category.second_text,
    }
  end

  defp serialize_category(category, :with_posts) do
    %{
      id: category.id,
      name: category.name,
      posts: render(TilWeb.PostView, "index_with_nested.json", posts: Enum.map(category.posts_categories, &(&1.post))),
      position: category.position,
      url: category.url,
      firstText: category.first_text,
      secondText: category.second_text,
    }
  end
end
