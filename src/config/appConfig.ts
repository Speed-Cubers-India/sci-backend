import dotenv from 'dotenv';

interface AppConfig {
  port: number;
}

dotenv.config();

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '4000', 10),
};

export default appConfig;
