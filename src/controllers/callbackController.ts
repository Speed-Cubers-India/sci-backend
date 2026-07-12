import { Request, Response } from "express";
import axios from "axios";
import appConfig from "../config/appConfig";
import { signSession } from "../utils/jwt";
import { setSessionCookie } from "../utils/sessionCookie";

const constructTokenParams = (authCode: string) => {
  const tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "authorization_code");
  tokenParams.append("code", authCode);
  tokenParams.append(
    "redirect_uri",
    `${appConfig.baseUrl}/api/auth/callback`
  );
  tokenParams.append("client_id", appConfig.wcaClientId);
  return tokenParams;
};

const callback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code;
  if (typeof code !== "string") {
    res.redirect(
      `${appConfig.frontendUrl}/login?error=invalid_authorization_code`
    );
    return;
  }
  try {
    const tokenUrl = new URL(`${appConfig.wcaUrl}/oauth/token`);
    const tokenParams = constructTokenParams(code);
    const basicAuthToken = Buffer.from(
      `${appConfig.wcaClientId}:${appConfig.wcaClientSecret}`
    ).toString("base64");
    const tokenResponse = await axios.post(
      tokenUrl.toString(),
      tokenParams.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuthToken}`,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    const userUrl = new URL(`${appConfig.wcaUrl}/api/v0/me`);
    const userResponse = await axios.get(userUrl.toString(), {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const wcaUser = userResponse.data.me;
    if (!wcaUser || typeof wcaUser.id !== "number") {
      res.redirect(`${appConfig.frontendUrl}/login?error=invalid_user_data`);
      return;
    }

    const sessionToken = signSession({
      id: wcaUser.id,
      wcaId: wcaUser.wca_id ?? null,
      name: wcaUser.name,
      avatarUrl: wcaUser.avatar?.thumb_url ?? wcaUser.avatar?.url ?? null,
    });

    setSessionCookie(res, sessionToken);

    if (process.env.NODE_ENV !== "production") {
      console.log(userResponse.data);
    }
    res.redirect(`${appConfig.frontendUrl}`);
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    res.redirect(`${appConfig.frontendUrl}/login?error=${error}`);
  }
};

export default callback;
