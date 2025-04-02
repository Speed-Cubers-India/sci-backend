import { Request, Response } from "express";
import appConfig from "../config/appConfig";
import { fetchUserData } from "../services/userService";

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
    res.status(401).json({ error: "Failed to initiate authentication" });
  }
};

/**
 * Handles OAuth callback, exchanges authorization code for access token,
 * and fetches user information
 */
export const callback = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;
  const frontendUrl = new URL(appConfig.frontendUrl);

  // Validate authorization code
  if (!code) {
    console.error("Missing authorization code");
    const errorUrl = new URL(frontendUrl.toString());
    errorUrl.pathname = "/login";
    errorUrl.searchParams.append("error", "missing-code");
    return res.redirect(errorUrl.toString());
  }

  try {
    const user = await fetchUserData(code as string);

    if (!user) {
      console.error("User data not found");
      const errorUrl = new URL(frontendUrl.toString());
      errorUrl.pathname = "/login";
      errorUrl.searchParams.append("error", "user-not-found");
      return res.redirect(errorUrl.toString());
    }

    // Store user data in session if needed
    // req.session.user = user;

    // Successful authentication
    const successUrl = new URL(frontendUrl.toString());
    successUrl.searchParams.append("login", "true"); // Add login=true as query parameter
    res.redirect(successUrl.toString());
  } catch (error) {
    console.error("Authentication callback error:", error);
    const errorUrl = new URL(frontendUrl.toString());
    errorUrl.pathname = "/auth-error";
    errorUrl.searchParams.append("message", "authentication_failed");
    res.redirect(errorUrl.toString());
  }
};
