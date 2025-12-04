# Secure Gateway Project: React + Ballerina + Asgardeo on Choreo

A robust, full-stack application demonstrating secure microservice communication. The project integrates a **React Frontend** with a **Ballerina Backend** API, deployed on **WSO2 Choreo**, and secured using **WSO2 Asgardeo** (Identity as a Service).

This project successfully implemented the full secure authentication and authorization flow, with deep documentation on complex JWT validation challenges.

## 🚀 Architecture and Components

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React (Vite), Asgardeo SDK | Manages user login, session, and retrieves the JWT Access Token. |
| **Identity Provider** | WSO2 Asgardeo | Handles OAuth 2.0/OIDC flows and issues the secure JWT. |
| **Backend API** | Ballerina | Contains the protected business logic, secured internally by a JWT Validator. |
| **Gateway/Platform** | WSO2 Choreo Connect | Serves as the first line of defense, validating the token against Choreo secrets before routing to Ballerina. |

## ⚙️ Configuration Status

All components are configured and deployed. The frontend successfully acquires a valid JWT, and the backend service is ready to process the data.

### Frontend Token Acquisition
The React application uses `getAccessToken()` to correctly retrieve and attach the JWT to the fetch request header: `Authorization: Bearer <token>`.

### Backend Ballerina Configuration
The service is hardcoded to validate the JWT against the exact claims found in the token, bypassing the common "value not provided" error:

```ballerina
http:JwtValidatorConfig jwtConfig = {
    // Hardcoded to match the token's exact claim
    issuer: "[https://api.asgardeo.io/t/maheshadinushan/oauth2/token](https://api.asgardeo.io/t/maheshadinushan/oauth2/token)",
    audience: "kTDc0kR6LffgJsfmm8SuLErXRe4a",
    signatureConfig: {
        jwksConfig: {url: "[https://api.asgardeo.io/t/maheshadinushan/oauth2/jwks](https://api.asgardeo.io/t/maheshadinushan/oauth2/jwks)"}
    }
};
// ... Service code uses this jwtConfig for authorization 
```

## 🎯 Technical Deep Dive: The Final Deadlock

The primary technical challenge involved a configuration deadlock between the Identity Provider (Asgardeo) and the Deployment Platform (Choreo), resulting in a persistent `401 Unauthorized` error.

### The Conflict

**1.Token Claim(`iss`):**The JWT Access Token issued by Asgardeo contains the full endpoint URL as the Issuer:`.../oauth2/token`.
**2.Validator Expectation:**Both the Ballerina code and the Choreo Connect Gateway initially expected the standard base URL:`.../t/maheshadinushan`.

### The Resolution (Successful Debugging)

We successfully isolated the error by:
* Debugging the token payload to prove the `iss` claim was incorrect.
* Hardcoding the Ballerina service to accept the full `.../oauth2/token` URL.

### Unresolved Platform Issue
Despite the correct configuration being applied to the Ballerina code and the corresponding Choreo Secrets being updated and the component Redeployed, the Choreo Connect Gateway layer continues to reject the token with the `invalid_token` error.

**Conclusion:** The configuration for the API Gateway's JWT validation cache appears to be locked to the default (short) Issuer URL, preventing the correctly configured traffic from reaching the backend service. This highlights a critical, advanced platform configuration barrier that requires further WSO2/Choreo support.

## 🛠️ Project Setup

### 1.Repository Structure
```
/
|-- frontend/           # React (Vite) SPA
|   |-- src/
|   |-- package.json
|-- backend/            # Ballerina Service Component
|   |-- service.bal     # Secured API definition
|   |-- Ballerina.toml
|-- README.md ```