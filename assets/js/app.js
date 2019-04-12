import React, { useReducer } from 'react';
import * as R from 'ramda';
import Overview from './Overview';
import { initalTasks }  from './initialState';

export const DispatchContext = React.createContext(null);

const groupInfo = ([name, grouping]) => ({
  name: name,
  total: R.length(grouping),
  completed: R.compose(R.length, R.filter(t => !R.isNil(t.completedAt)))(grouping)
});

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TASKS": return action.groupName;
    case "SHOW_GROUPS": return "SHOW_GROUPS";
    default: state
  }
}

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "DO_TASK":
      return R.map(task => {
        if (task.id === action.id && task.lockedIds.length === 0 && R.isNil(task.completedAt)) {
          return {...task, completedAt: Date.now()}
        }

        if (R.contains(action.id, task.lockedIds)) {
          return {...task, lockedIds: R.without([action.id], task.lockedIds)}
        }

        return task
      }, state)
    case "UNDO_TASK":
      return R.map(task => {
        if (task.id === action.id && task.lockedIds.length === 0 && !R.isNil(task.completedAt)) {
          return {...task, completedAt: null}
        }

        if (R.contains(action.id, task.dependencyIds)) {
          return {...task, lockedIds: R.append(action.id, task.lockedIds)}
        }

        return task
      }, state)
    default:
      return state
  }
}

const getList = (filter, tasks) => {
  if (filter === "SHOW_GROUPS")
    return R.compose(R.map(groupInfo), R.toPairs, R.groupBy(({group}) => group))(tasks)
  else
    return R.filter((t) => t.group === filter, tasks)
}

const applyLockedIds = (tasks) => R.map(task => R.assoc("lockedIds", task.dependencyIds, task))(tasks)

const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, "SHOW_GROUPS")
  const [tasks, dispatchTasks] = useReducer(tasksReducer, initalTasks, applyLockedIds)

  const dispatch = { dispatchFilter, dispatchTasks }
  const list = getList(filter, tasks)

  return (
    <DispatchContext.Provider value={{ tasks, dispatch }}>
      <Overview list={list} title={list[0].group}/>
    </DispatchContext.Provider>
  )
};

export default App;
