import React, { useState, useContext } from 'react';
import * as R from 'ramda';
import Detail from './Detail';
import { DispatchContext } from './App.js';

const containerStyle = {
  width: "800px",
  maxWidth: "100%",
  margin: "auto",
  paddingTop: "3em"
};

const titleRowStyle = {
  alignItems: "flex-end",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "1em"
}

const groupsLinkStyle = {
  color: "dodgerBlue"
}

const tableStyle = {
  display: "table",
  width: "100%",
  borderCollapse: "collapse"
}

const Overview = (props) => {
  const { tasks, dispatch } = useContext(DispatchContext);

  const title = props.title || "Things To Do"

  const handleShowGroups = () => dispatch.dispatchFilter({type: "SHOW_GROUPS"})

  const listItems = R.map((item) => <Detail item={item} key={item.id || item.name}/>);

  return (
    <div style={containerStyle}>
      <div style={titleRowStyle}>
        <h2 style={{marginBottom: "0"}}> {title} </h2>
        {!!props.title && <a sytle={groupsLinkStyle} onClick={handleShowGroups}> ALL GROUPS </a>}
      </div>

      <div style={tableStyle}>
        {listItems(props.list)}
      </div>
    </div>
  )
};

export default Overview;
