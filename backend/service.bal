import ballerina/http;

//JWT validation configuration

configurable string ASGARDEO_ISSUER = "https://api.asgardeo.io/t/maheshadinushan/oauth2/token";
configurable string ASGARDEO_AUDIENCE = "kTDc0kR6LffgJsfmm8SuLErXRe4a";
configurable string ASGARDEO_JWKS_URI = "https://api.asgardeo.io/t/maheshadinushan/oauth2/jwks";

http:JwtValidatorConfig jwtConfig = {
    issuer: ASGARDEO_ISSUER,
    audience: ASGARDEO_AUDIENCE,
    signatureConfig: {
        jwksConfig: {url: ASGARDEO_JWKS_URI}
    }
};

