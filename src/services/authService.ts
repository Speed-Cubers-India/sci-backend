import appConfig from "../config/appConfig";
import { fetchUserData } from "./userService";

//authURL
export const constructAuthUrl = () => {
  const authUrl = new URL(`${appConfig.wcaUrl}/oauth/authorize`);

  // Configure OAuth parameters
  authUrl.searchParams.append("client_id", appConfig.wcaClientId);
  authUrl.searchParams.append("redirect_uri", "/api/auth/callback");
  authUrl.searchParams.append("response_type", "code");

  return authUrl.toString();
};


//loginURL
export const contructLoginUrl = async (code: string) => {
  const frontendUrl = new URL(appConfig.frontendUrl);

  // Validate authorization code
  if (!code) {
    console.error("Missing authorization code");
    const errorUrl = new URL(frontendUrl.toString());
    errorUrl.pathname = "/login";
    errorUrl.searchParams.append("error", "missing-code");
    return errorUrl.toString();
  }

  try {
    const user = await fetchUserData(code as string);

    if (!user) {
      console.error("User data not found");
      const errorUrl = new URL(frontendUrl.toString());
      errorUrl.pathname = "/login";
      errorUrl.searchParams.append("error", "user-not-found");
      return errorUrl.toString();
    }

    // Store user data in session if needed
    // req.session.user = user;

    // Successful authentication
    const successUrl = new URL(frontendUrl.toString());
    successUrl.searchParams.append("login", "true");
    return successUrl.toString();
  } catch (error) {
    console.error("Error fetching user data:", error);
    const errorUrl = new URL(frontendUrl.toString());
    errorUrl.pathname = "/login";
    errorUrl.searchParams.append("error", "authentication-failed");
    return errorUrl.toString();
  }
};
