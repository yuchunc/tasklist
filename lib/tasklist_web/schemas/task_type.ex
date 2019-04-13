defmodule TasklistWeb.TaskType do
  use Absinthe.Schema.Notation

  object :task_object do
    field :id, non_null(:id), description: "Task Id"

    field :task,
          non_null(:string),
          description: "Name of the Task",
          resolve: & &1.name

    field :dependencyIds,
          list_of(:id) |> non_null,
          description: "Dependency of the Task",
          resolve: & &1.dependency_ids

    field :completedAt,
          :string,
          description: "Time of task completion",
          resolve: & &1.completed_at

    field :group,
          :string,
          description: "Name of the Group task belongs to, would be implemented using dataloader",
          resolve: "Some Group"
  end
end
