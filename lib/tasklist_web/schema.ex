defmodule TasklistWeb.Schema do
  use Absinthe.Schema

  import_types(TasklistWeb.TaskType)

  query do
    field :tasks, list_of(:task_object) do
      description("Get all tasks")

      resolve([
        %{
          id: 1,
          group_id: "Purchases",
          name: "Go to the bank",
          dependency_ids: [],
          completed_at: nil
        },
        %{
          id: 2,
          group_id: "Purchases",
          name: "Buy hammer",
          dependency_ids: [1],
          completed_at: nil
        },
        %{
          id: 3,
          group_id: "Purchases",
          name: "Buy wood",
          dependency_ids: [1],
          completed_at: nil
        },
        %{
          id: 4,
          group_id: "Purchases",
          name: "Buy nails",
          dependency_ids: [1],
          completed_at: nil
        },
        %{
          id: 5,
          group_id: "Purchases",
          name: "Buy paint",
          dependency_ids: [1],
          completed_at: nil
        },
        %{
          id: 6,
          group_id: "Build Airplane",
          name: "Hammer nails into wood",
          dependency_ids: [2, 3, 4],
          completed_at: nil
        },
        %{
          id: 7,
          group_id: "Build Airplane",
          name: "Paint wings",
          dependency_ids: [5, 6],
          completed_at: nil
        },
        %{
          id: 8,
          group_id: "Build Airplane",
          name: "Have a snack",
          dependency_ids: [],
          completed_at: nil
        }
      ])
    end
  end
end
