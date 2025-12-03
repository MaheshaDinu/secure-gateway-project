
import { useState } from 'react';
import './App.css'
import { useAuthContext } from '@asgardeo/auth-react'

function App() {
  const { state, signIn, signOut} = useAuthContext();

  const accessToken = state.accessToken;

  const [response, setResponse] = useState({ message: "No data fetched yet." });
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try{
      setLoading(true);
      if (!accessToken) {
        throw new Error("No access token available.");
        
      }
      const apiResponse = await fetch("https://99a2fd36-7b2a-4765-a19d-b98e3d92616c-dev.e1-us-east-azure.choreoapis.dev/securegatewayproject/securegatewaybackend/v1.0/data",
        {
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      const data = await apiResponse.json();
      setResponse(data);

    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse({ message: "Failed to fetch data." });
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <div className='heading'><img className='logo'  src="./src/assets/secure_logo.png" alt="secure_logo" /><h1> Secure Gateway Project</h1></div>
      
      {state.isAuthenticated ? (
        // UI SHOWN WHEN LOGGED IN
        <div className="dashboard">
          <p>Welcome! You are securely logged in.</p>
          <p>Username: <strong>{state.username}</strong></p>
          
          <button onClick={() => signOut()}>Logout</button>
          
          <div className="data-box">
             <h3>Secret Data Area</h3>
             <p>This is where your Ballerina API data will load later.</p>
             {/* 4. Added button to trigger the fetch function */}
             <button onClick={fetchData} disabled={loading || !accessToken}>
                {loading ? 'Fetching...' : 'Fetch Secure Data'}
             </button>
             
             {/* 5. Display the structured response from Ballerina */}
             {response.message && <p>API Status: **{response.message}**</p>}
             {response.items && (
                <ul>
                    {response.items.map((item, index) => (
                        <li key={index}>Item {item.id}: **{item.secret}**</li>
                    ))}
                </ul>
             )}
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
