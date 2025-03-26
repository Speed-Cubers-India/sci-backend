import dotenv from 'dotenv';

interface AppConfig {
  port: number;
  wca_client_id: string;
  wca_client_secret: string;
  wca_url: string;
  base_url: string;
  frontend_url: string;
}

dotenv.config();

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '4000', 10),
  wca_client_id: process.env.WCA_CLIENT_ID || 'client_id from WCA',
  wca_client_secret: process.env.WCA_CLIENT_SECRET || 'client_secret from WCA',
  wca_url: process.env.WCA_URL || 'WCA url',
  base_url: process.env.BASE_URL || 'http://localhost:4000',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export default appConfig;
