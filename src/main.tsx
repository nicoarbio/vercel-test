import { DatePicker } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login'
import './style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
)


function App() {
  return (
    <Login />
  )
}
