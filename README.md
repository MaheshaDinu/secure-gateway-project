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