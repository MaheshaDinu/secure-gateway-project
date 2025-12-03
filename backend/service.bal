import ballerina/http;

//JWT validation configuration

configurable string ASGARDEO_ISSUER = ?;
configurable string ASGARDEO_AUDIENCE = ?;
configurable string ASGARDEO_JWKS_URI = ?;

http:JwtValidatorConfig jwtConfig = {
    issuer: ASGARDEO_ISSUER,
    audience: ASGARDEO_AUDIENCE,
    signatureConfig: {
        jwksConfig: {url: ASGARDEO_JWKS_URI}
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
