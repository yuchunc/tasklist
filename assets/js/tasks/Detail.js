import React from 'react';
import { ReactComponent as GroupSVG } from '../../static/images/Group.svg';
import { ReactComponent as IncompleteSVG } from '../../static/images/Incomplete.svg';

const rowStyle = {
  alignItems: "center",
  borderTop: "1px solid gainsboro",
  borderBottom: "1px solid gainsboro",
  display: "table-row",
  height: "4.5em",
  width: "100%"
}

const svgStyle = {
  display: "table-cell",
  verticalAlign: "middle"
}

const taskTextStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  width: "90%"
}

const Detail = () => (
  <>
  <div style={rowStyle}>
    <div style={svgStyle}>
      <GroupSVG />
    </div>
    <div style={taskTextStyle}> Ohei </div>
  </div>
  <div style={rowStyle}>
    <div style={svgStyle}>
      <IncompleteSVG style={svgStyle}/>
    </div>
    <div style={taskTextStyle}> Ohei </div>
  </div>
  </>
);

export default Detail;
