import React from 'react';
import * as R from 'ramda';
import Overview from './tasks/Overview';
import { dummyTasks }  from './initialState.js';

export const TasksDispatch = React.createContext(null);

export const groupTasks = (tasks) => {
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
    }

    return task
  };

  const mappedTasks = R.map(applyLocked, tasks);
  return R.groupBy(({group}) => group, mappedTasks);
}

const groupInfo = ([name, grouping]) => ({
  name: name,
  total: R.length(grouping),
  completed: R.length(R.filter(R.isNil, grouping))
})

const initializeList = R.compose(R.map(groupInfo), R.toPairs, groupTasks)(dummyTasks)

const App = () => {
  return (
    <Overview list={initializeList}/>
  )
};

export default App;
