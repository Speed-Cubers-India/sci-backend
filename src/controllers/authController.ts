import axios from "axios";
import { Request, Response } from "express";
import appConfig from "../config/appConfig";

/**
 * Initiates OAuth login flow by redirecting to the WCA authorization endpoint
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUrl = new URL(`${appConfig.wcaUrl}/oauth/authorize`);
    
    // Configure OAuth parameters
    authUrl.searchParams.append("client_id", appConfig.wcaClientId);
    authUrl.searchParams.append("redirect_uri", "/api/auth/callback");
    authUrl.searchParams.append("response_type", "code");
    
    // Redirect user to authorization page
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("Authentication redirect error:", error);
    res.status(500).json({ error: "Failed to initiate authentication" });
  }
};

/**
 * Handles OAuth callback, exchanges authorization code for access token,
 * and fetches user information
 */
export const callback = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;
  const frontendUrl = new URL(appConfig.frontendUrl || "http://localhost:5173");
  
  // Validate authorization code
  if (!code) {
    console.error("Missing authorization code");
    const errorUrl = new URL(frontendUrl.toString());
    errorUrl.pathname = "/auth-error";
    errorUrl.searchParams.append("message", "missing_code");
    return res.redirect(errorUrl.toString());
  }
  
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
    
    const user = userResponse?.data;
    
    if (!user) {
      console.error("User data not found");
      const errorUrl = new URL(frontendUrl.toString());
      errorUrl.pathname = "/auth-error";
      errorUrl.searchParams.append("message", "user_not_found");
      return res.redirect(errorUrl.toString());
    }
    
    // Store user data in session if needed
    // req.session.user = user;
    
    // Successful authentication
    res.redirect(frontendUrl.toString());
  } catch (error) {
    console.error("Authentication callback error:", error);
    const errorUrl = new URL(frontendUrl.toString());
    errorUrl.pathname = "/auth-error";
    errorUrl.searchParams.append("message", "authentication_failed");
    res.redirect(errorUrl.toString());
  }
};
