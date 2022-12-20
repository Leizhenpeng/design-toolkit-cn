import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { io_hook as io } from 'kiss-msg'

io?.send('ui:ready', '22')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
