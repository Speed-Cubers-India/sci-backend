import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<void> => {
  const redirectUri = "/api/auth/callback";
  const queryParams = `?client_id=${process.env.WCA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
  const authUrl = `${process.env.WCA_URL}/oauth/authorize${queryParams}`;
  res.redirect(authUrl);
};

export default login;
