import React from 'react';
import Detail from './Detail';

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

const Overview = () => (
  <div style={containerStyle}>
    <div style={titleRowStyle}>
      <h2 style={{marginBottom: "0"}}> Things To Do </h2>
      <a sytle={groupsLinkStyle}> ALL GROUPS </a>
    </div>

    <div style={tableStyle}>
      <Detail />
    </div>
  </div>
);

export default Overview;
