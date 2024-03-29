defmodule Til.Repo do
  use Ecto.Repo,
    otp_app: :til,
    adapter: Ecto.Adapters.Postgres
  use Scrivener, page_size: 20

  def init(_, config) do
    config = config
      # Setting host from docker environment
      |> Keyword.put(:hostname, System.get_env("PGHOST"))
    {:ok, config}
  end
end
