import axios from "axios";
import { Request, Response } from "express";
import appConfig from "../config/appConfig";

const callback = async (req: Request, res: Response): Promise<any> => {
  const { code } = req.query;
  const FRONTEND_URL = appConfig.frontendUrl || "http://localhost:5173";

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(`${appConfig.wcaUrl}/oauth/token`, {
      grant_type: "authorization_code",
      client_id: appConfig.wcaClientId,
      client_secret: appConfig.wcaClientSecret,
      code,
      redirect_uri: "/api/auth/callback",
    });

    const { access_token } = tokenResponse.data;

    // Fetch user details
    const userResponse = await axios.get(`${appConfig.wcaUrl}/api/v0/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const user = userResponse?.data;

    if (!user) {
      console.log("No user found");
    }

    // Successful authentication
    res.redirect(`${FRONTEND_URL}`);
  } catch (error) {
    console.log(error);
  }
};

export default callback;
