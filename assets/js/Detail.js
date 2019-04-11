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

const itemIcon = ({task, locked, completedAt}) => {
  if (task === undefined)
    return <GroupSVG />
  else if (locked === true)
    return <LockedSVG />
  else if (completedAt === null)
    return <IncompleteSVG />
  else
    return <CompletedSVG />
}

const Detail = (props) => {
  const [item, setItem] = useState(props.item);
  const dispatch = useContext(DispatchContext);

  const handleShowGroupTasks = () => {
    if (item.id === undefined)
      dispatch({type: "SHOW_TASKS", groupName: item.name});
  }

  return (
    <div style={rowStyle} onClick={handleShowGroupTasks}>
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
