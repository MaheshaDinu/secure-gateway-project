import ballerina/http;

//JWT validation configuration

// configurable string ASGARDEO_ISSUER = ?;
// configurable string ASGARDEO_AUDIENCE = ?;
// configurable string ASGARDEO_JWKS_URI = ?;

http:JwtValidatorConfig jwtConfig = {
    issuer: "https://api.asgardeo.io/t/maheshadinushan",
    audience: "kTDc0kR6LffgJsfmm8SuLErXRe4a",
    signatureConfig: {
        jwksConfig: {url: "https://api.asgardeo.io/t/maheshadinushan/oauth2/jwks"}
    }
};

//define secured listner 
listener http:Listener SecuredEP = new (9090);

//define secured service
@http:ServiceConfig {
    auth: [
        {
            jwtValidatorConfig:jwtConfig
        }
    ]
}

service /api on SecuredEP {
    resource function get data() returns json {
        return { message:"you are authenticated via Asgardeo JWT!" };
    }
}
