import React, { useReducer } from 'react';
import * as R from 'ramda';
import Overview from './Overview';
import { initalTasks }  from './initialState';

export const DispatchContext = React.createContext(null);

const groupInfo = ([name, grouping]) => ({
  name: name,
  total: R.length(grouping),
  completed: R.length(R.filter(R.isNil, grouping))
});

const filterReducer = (state, action) => {
  console.log("f", action);
  switch (action.type) {
    case "SHOW_TASKS": return action.groupName;
    case "SHOW_GROUPS": return "SHOW_GROUPS";
    default: state
  }
}

const tasksReducer = (state, action) => {
  console.log("t", action);
  switch (action.type) {
    case "DO_TASK":
      return R.map(task => {
        if (task.id === action.id && task.locked === false) {
          return {...task, completedAt: Date.now()}
        }

        if (R.contains(action.id, task.lockedIds)) {
          return {...task, lockedIds: R.without([action.id], task.lockedIds)}
        }

        return task
      }, state)
    default:
      return state
  }
}

const applyLockedIds = (tasks) => R.map(task => R.assoc("lockedIds", task.dependencyIds, task))(tasks)

const App = () => {
  //const [filter, dispatchFilter] = useReducer(filterReducer, "SHOW_GROUPS")
  const [filter, dispatchFilter] = useReducer(filterReducer, "Purchases")
  const [tasks, dispatchTasks] = useReducer(tasksReducer, applyLockedIds(initalTasks))

  const dispatch = { dispatchFilter, dispatchTasks }

  const uiList = (filter) => {
    if (filter === "SHOW_GROUPS")
      return R.compose(R.map(groupInfo), R.toPairs, R.groupBy(({group}) => group))(tasks)
    else
      return R.filter((t) => t.group === filter, tasks)
  }

  return (
    <DispatchContext.Provider value={{dispatchFilter, dispatchTasks}}>
      <Overview list={uiList(filter)} title={uiList(filter)[0].group}/>
    </DispatchContext.Provider>
  )
};

export default App;
