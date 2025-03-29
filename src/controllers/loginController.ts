import { Request, Response } from "express";
import appConfig from "../config/appConfig";

const login = async (req: Request, res: Response): Promise<void> => {
  const redirectUri = "/api/auth/callback";
  const queryParams = `?client_id=${appConfig.wcaClientId}&redirect_uri=${redirectUri}&response_type=code`;
  const authUrl = `${appConfig.wcaUrl}/oauth/authorize${queryParams}`;
  res.redirect(authUrl);
};

export default login;
