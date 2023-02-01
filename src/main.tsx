import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import './style.css'

import Login, { UserProfile } from './Login'

import { AuthContext } from './Contexts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
)

function App() {
  const [profile, setProfile] = useState<UserProfile>();

  return (
    <AuthContext.Provider value={{profile, setProfile}}>
      <Login />
    </AuthContext.Provider>
  )
}
