defmodule Tasklist.Todo.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :dependency_ids, {:array, :integer}
    field :name, :string
    field :group_id, :id
    field :completed_at, :naive_datetime

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :dependency_ids])
    |> validate_required([:name, :dependency_ids])
  end
end
