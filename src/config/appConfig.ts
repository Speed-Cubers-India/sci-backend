import dotenv from 'dotenv';

interface AppConfig {
  port: number;
  frontendUrl: string;
  baseUrl: string;
  wcaUrl: string;
  wcaClientId: string;
  wcaClientSecret: string;
  jwtSecret: string;
  isProduction: boolean;
}

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET || '';

if (!jwtSecret && isProduction) {
  throw new Error('JWT_SECRET environment variable is required in production');
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '4000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  baseUrl: process.env.BASE_URL || 'http://localhost:4000',
  wcaUrl: process.env.WCA_URL || 'https://www.worldcubeassociation.org',
  wcaClientId: process.env.WCA_CLIENT_ID || '',
  wcaClientSecret: process.env.WCA_CLIENT_SECRET || '',
  jwtSecret: jwtSecret || 'dev-only-insecure-jwt-secret',
  isProduction,
};

export default appConfig;
