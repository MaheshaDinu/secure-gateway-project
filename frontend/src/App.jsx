import { useState } from 'react';
import './App.css'; 
import { useAuthContext } from '@asgardeo/auth-react';

function App() {
  const { state, signIn, signOut, getAccessToken } = useAuthContext();
  const [response, setResponse] = useState({ message: "Ready to fetch secure data." });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    setResponse({ message: "Fetching data from Ballerina API..." });

    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Authentication failure: No access token available.");
      }

      const apiUrl = "https://99a2fd36-7b2a-4765-a19d-b98e3d92616c-dev.e1-us-east-azure.choreoapis.dev/securegatewayproject/securegatewaybackend/v1.0/data";
      
      const apiResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!apiResponse.ok) {
        // Attempt to read error message from backend if available
        const errorText = await apiResponse.text();
        throw new Error(`API Request Failed: HTTP ${apiResponse.status}. ${errorText.substring(0, 100)}`);
      }

      const data = await apiResponse.json();
      setResponse(data);

    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setResponse({ message: "Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  const usernameDisplay = state.username || state.email || 'User';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Secure Gateway Project <span className="tag-line">Powered by Asgardeo & Choreo</span></h1>
        {state.isAuthenticated && (
          <button onClick={() => signOut()} className="btn-logout">
            Logout
          </button>
        )}
      </header>
      
      <main className="main-content">
        {!state.isAuthenticated ? (
          <div className="auth-card">
            <h2>🔒 Access Restricted</h2>
            <p>This application demonstrates secure data access using **Asgardeo** for identity management and **Choreo** for the API gateway.</p>
            <button onClick={() => signIn()} className="btn-primary">
              Login with Asgardeo to continue
            </button>
          </div>
        ) : (
          <div className="dashboard">
            <h2 className="welcome-message">
              Welcome, {usernameDisplay}!
            </h2>
            <p className="status-indicator success">
              ✅ Authentication Status: Connected
            </p>
            
            <section className="data-fetch-section">
              <h3>API Resource Access</h3>
              <p>Your session token is active. Click below to access the Ballerina protected API.</p>
              
              <button 
                onClick={fetchData} 
                disabled={loading || !state.isAuthenticated}
                className="btn-fetch"
              >
                {loading ? 'Fetching Data...' : 'Fetch Secure Data'}
              </button>
              
              <div className={`response-box ${error ? 'error' : 'success'}`}>
                <h4>API Response Status:</h4>
                {error && <p className="response-error">ERROR: {error}</p>}
                
                {response.message && <p>Status Message: **{response.message}**</p>}
                
                {response.items && (
                  <div className="response-data">
                    <h5>Secure Data Items:</h5>
                    <ul>
                      {response.items.map((item, index) => (
                        <li key={index}>Item {item.id}: **{item.secret}**</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>© 2025 SecureGateway Demo</p>
      </footer>
    </div>
  );
}

export default App;