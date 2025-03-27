import dotenv from 'dotenv';

interface AppConfig {
  port: number;
  frontendUrl: string;
}

dotenv.config();

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '4000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export default appConfig;
