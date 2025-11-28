import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "@asgardeo/auth-react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider config={ {
            signInRedirectURL: "http://localhost:5173/",
            signOutRedirectURL: "http://localhost:5173/",
            clientID: "kTDc0kR6LffgJsfmm8SuLErXRe4a",
            baseUrl: "https://api.asgardeo.io/t/maheshadinushan",
            scope: [ "openid","profile" ]
        } }>
      <App />
    </AuthProvider>
  </StrictMode>,
)
