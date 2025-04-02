import axios from "axios";

export async function fetchUserData(code, appConfig) {
  try {
    // Create token endpoint URL
    const tokenUrl = new URL(`${appConfig.wcaUrl}/oauth/token`);

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(tokenUrl.toString(), {
      grant_type: "authorization_code",
      client_id: appConfig.wcaClientId,
      client_secret: appConfig.wcaClientSecret,
      code,
      redirect_uri: "/api/auth/callback",
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
    console.error("Error fetching user data:", error.message);
    throw new Error("Failed to fetch user data");
  }
}
