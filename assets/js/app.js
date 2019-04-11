import React, { useReducer } from 'react';
import * as R from 'ramda';
import Overview from './Overview';
import { initalTasks }  from './initialState';

export const DispatchContext = React.createContext(null);

const groupedTasks = (tasks) => {
  const applyLocked = (task) => {
    const pred = R.where({
      id: R.contains(R.__, task.dependencyIds),
      completedAt: R.isNil
    });

    if (task.dependencyIds == []) {
      task.locked = false
    } else if (R.find(pred, tasks)) {
      task.locked = true
    } else {
      task.locked = false
    };

    return task
  };

  const mappedTasks = R.map(applyLocked, tasks);
  return R.groupBy(({group}) => group, mappedTasks);
};

const groupInfo = ([name, grouping]) => ({
  name: name,
  total: R.length(grouping),
  completed: R.length(R.filter(R.isNil, grouping))
});

const prepList = (filter, tasks) => {
}

const displayFilterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TASKS": return action.groupName;
    default: return "SHOW_GROUPS";
  }
}

const App = () => {
  const [displayFilter, dispatchDisplayFilter] = useReducer(displayFilterReducer, "SHOW_GROUPS")
  const tasks = initalTasks
  const dispatch = action => dispatchDisplayFilter(action);

  let uiList
  if (displayFilter !== "SHOW_GROUPS")
    uiList = R.filter((t) => t.group === displayFilter, tasks)
  else
    uiList = R.compose(R.map(groupInfo), R.toPairs, groupedTasks)(tasks)

  return (
    <DispatchContext.Provider value={dispatch}>
      <Overview list={uiList} title={uiList[0].group}/>
    </DispatchContext.Provider>
  )
};

export default App;
