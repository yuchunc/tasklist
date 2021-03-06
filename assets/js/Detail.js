import React, { useState, useContext } from 'react';
import { DispatchContext } from './App.js';
import { ReactComponent as GroupSVG } from '../static/images/Group.svg';
import { ReactComponent as LockedSVG } from '../static/images/Locked.svg';
import { ReactComponent as IncompleteSVG } from '../static/images/Incomplete.svg';
import { ReactComponent as CompletedSVG } from '../static/images/Completed.svg';

const rowStyle = {
  alignItems: "center",
  borderTop: "1px solid darkgray",
  borderBottom: "1px solid darkgray",
  display: "table-row",
  height: "4.5em",
  width: "100%"
}

const svgStyle = {
  display: "table-cell",
  verticalAlign: "middle"
}

const itemInfoStyle = {
  display: "table-cell",
  fontWeight: "bold",
  verticalAlign: "middle",
  width: "90%"
}

const itemSubTextStyle = {
  display: "block",
  fontSize: "0.7em",
  color: "darkgray"
}

const itemIcon = ({task, lockedIds, completedAt}) => {
  if (task === undefined)
    return <GroupSVG />
  if (lockedIds.length > 0)
    return <LockedSVG />
  if (completedAt === null)
    return <IncompleteSVG />
  if (completedAt !== null)
    return <CompletedSVG />

  return false
}

const Detail = ({item}) => {
  const { tasks, dispatch } = useContext(DispatchContext);

  const handleClickRow = () => {
    if (item.id === undefined) {
      dispatch.dispatchFilter({type: "SHOW_TASKS", groupName: item.name});
      return false
    }
    if (item.lockedIds.length === 0 && item.completedAt === null) {
      dispatch.dispatchTasks({type: "DO_TASK", id: item.id})
      return false
    }
    if (item.completedAt !== null) {
      dispatch.dispatchTasks({type: "UNDO_TASK", id: item.id})
      return false
    }
  }

  return (
    <div style={rowStyle} onClick={handleClickRow}>
      <div style={svgStyle}>
        {itemIcon(item)}
      </div>
      <div style={itemInfoStyle}>
        {item.task || item.name}
        <div style={itemSubTextStyle}>
          {item.task === undefined && `${item.completed} OF ${item.total} TASKS COMPLETE`}
        </div>
      </div>
    </div>
  )
};

export default Detail;
