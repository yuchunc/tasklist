import React, { useReducer } from 'react';
import * as R from 'ramda';
import Overview from './Overview';
import { dummyTasks }  from './initialState';

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
  if (filter !== "GROUPS")
    return []
  else
    return R.compose(R.map(groupInfo), R.toPairs, groupedTasks)(tasks)
}

const displayFilterReducer = (state, action) => {
  switch (action.type) {
    case "TASKS": return action.groupName;
    default: return "GROUPS";
  }
}

const App = () => {
  const [displayFilter, dispatchDisplayFilter] = useReducer(displayFilterReducer, "GROUPS")

  return (
    <Overview list={prepList(displayFilter, dummyTasks)}/>
  )
};

export default App;
