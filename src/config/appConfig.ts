import dotenv from "dotenv";

interface AppConfig {
  port: number;
  frontendUrl: string;
  baseUrl: string;
  wcaUrl: string;
  wcaClientId: string;
  wcaClientSecret: string;
}

dotenv.config();

function getRequiredEnv(varName: string): string {
  const value = process.env[varName];
  if (!value) {
    throw new Error(
      `Environment variable ${varName} is required but was not provided.`
    );
  }
  return value;
}
const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || "4000", 10),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  baseUrl: process.env.BASE_URL || "http://localhost:4000",
  wcaUrl: process.env.WCA_URL || "https://www.worldcubeassociation.org",
  wcaClientId: getRequiredEnv("WCA_CLIENT_ID"),
  wcaClientSecret: getRequiredEnv("WCA_CLIENT_SECRET"),
};

export default appConfig;
