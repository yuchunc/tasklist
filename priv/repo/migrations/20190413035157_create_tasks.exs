defmodule Tasklist.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :dependency_ids, {:array, :integer}
      add :group_id, references(:groups, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:group_id])
  end
end
