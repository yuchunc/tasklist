import React from 'react'
import ReactDOM from 'react-dom'

const HelloComponent = () => <div>This is a Component!!!</div>

ReactDOM.render(<HelloComponent />, document.getElementById('mountPoint'))
