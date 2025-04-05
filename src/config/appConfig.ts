import dotenv from 'dotenv';

interface AppConfig {
  port: number;
  frontendUrl: string;
  baseUrl: string;
  wcaUrl: string;
  wcaClientId: string;
  wcaClientSecret: string;
}

dotenv.config();

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '4000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  baseUrl: process.env.BASE_URL || 'http://localhost:4000',
  wcaUrl: process.env.WCA_URL || 'https://www.worldcubeassociation.org',
  wcaClientId: process.env.WCA_CLIENT_ID || '',
  wcaClientSecret: process.env.WCA_CLIENT_SECRET || '',
};

export default appConfig;
