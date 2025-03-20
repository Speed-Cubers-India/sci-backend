import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<void> => {
  const redirectUri = `${process.env.BASE_URL}/api/auth/callback`;
  const queryParams = `?client_id=${process.env.WCA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
  const authUrl = `https://www.worldcubeassociation.org/oauth/authorize${queryParams}`;
  res.redirect(authUrl);
};

export default login;
