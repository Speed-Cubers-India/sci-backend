import axios from "axios";
import appConfig from "../config/appConfig";

//authURL
export const constructAuthUrl = () => {
  const authUrl = new URL(`${appConfig.wcaUrl}/oauth/authorize`);

  // Configure OAuth parameters
  authUrl.searchParams.append("client_id", appConfig.wcaClientId);
  authUrl.searchParams.append("redirect_uri", `${appConfig.baseUrl}/api/auth/callback`);
  authUrl.searchParams.append("response_type", "code");

  return authUrl.toString();
};


export async function fetchUserData(authCode: string) {

  if(!authCode) {
    console.error("Missing authorization code");
    throw new Error("Missing authorization code");
  }

  try {
    // Create token endpoint URL
    const tokenUrl = new URL(`${appConfig.wcaUrl}/oauth/token`);

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(tokenUrl.toString(), {
      grant_type: "authorization_code",
      client_id: appConfig.wcaClientId,
      client_secret: appConfig.wcaClientSecret,
      code: authCode,
      redirect_uri: `${appConfig.baseUrl}/api/auth/callback`,
    });

    const { access_token } = tokenResponse.data;

    // Create user data endpoint URL
    const userUrl = new URL(`${appConfig.wcaUrl}/api/v0/me`);

    // Fetch user details
    const userResponse = await axios.get(userUrl.toString(), {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return userResponse.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}

