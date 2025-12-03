import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider, } from "@asgardeo/auth-react";
//added hardcoded redirect URLs 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider config={ {
            signInRedirectURL: "https://88da18c0-a314-43c3-8556-74cf53339687.e1-us-east-azure.choreoapps.dev/callback",
            signOutRedirectURL: "https://88da18c0-a314-43c3-8556-74cf53339687.e1-us-east-azure.choreoapps.dev/",
            clientID: "kTDc0kR6LffgJsfmm8SuLErXRe4a",
            baseUrl: "https://api.asgardeo.io/t/maheshadinushan",
            scope: [ "openid","profile" ]
        } }>
      <App />
    </AuthProvider>
  </StrictMode>,
)
