import appConfig from "../config/appConfig";

export const constructLoginUrl = () => {
    const authUrl = new URL(`${appConfig.wcaUrl}/oauth/authorize`);
    
    // Configure OAuth parameters
    authUrl.searchParams.append("client_id", appConfig.wcaClientId);
    authUrl.searchParams.append("redirect_uri", "/api/auth/callback");
    authUrl.searchParams.append("response_type", "code");
    
    return authUrl.toString();
}