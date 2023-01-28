import { DatePicker } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login'
import './style.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId: string = process.env.CLIENTID as string;
/* const clientId: string = "631866207959-nrqcja05teehqeel7ah0u7r6b9eua4tn.apps.googleusercontent.com"; */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId} >
        <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)


function App() {
  return (
    <Login />
  )
}
