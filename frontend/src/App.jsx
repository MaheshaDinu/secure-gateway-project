
import './App.css'
import { useAuthContext } from '@asgardeo/auth-react'

function App() {
  const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
 

  return (
    <div className="App">
      <h1>WSO2 Secure Gateway Project</h1>
      
      {state.isAuthenticated ? (
        // UI SHOWN WHEN LOGGED IN
        <div className="dashboard">
          <p>Welcome! You are securely logged in.</p>
          <p>Username: <strong>{state.username}</strong></p>
          
          <button onClick={() => signOut()}>Logout</button>
          
          <div className="data-box">
             <h3>Secret Data Area</h3>
             <p>This is where your Ballerina API data will load later.</p>
             {/* We will add the API call here in Phase 4 */}
          </div>
        </div>
      ) : (
        // UI SHOWN WHEN LOGGED OUT
        <div className="login-area">
          <p>You must log in to access the secure API.</p>
          <button onClick={() => signIn()}>Login with Asgardeo</button>
        </div>
      )}
    </div>
  )
}

export default App
