defmodule TilWeb.PostController do
  use TilWeb, :controller
  alias Til.Accounts
  alias Til.ShareableContent

  def index(conn, _) do
    conn
      |> put_status(:ok)
      |> render("index.json", posts: ShareableContent.get_posts)
  end

  def create(conn, params) do
    current_user_uuid = conn.private.guardian_default_resource.uuid
    author = Accounts.get_user_by(uuid: current_user_uuid)

    case ShareableContent.create_post(author, params) do
      {:ok, post} ->
        conn
        |> put_status(:created)
        |> render("create.json", post: ShareableContent.get_post(post.id))

      {:error, %Ecto.Changeset{errors: _} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> put_view(TilWeb.ErrorView)
        |> render("400.json", changeset: changeset)
    end
  end
end
