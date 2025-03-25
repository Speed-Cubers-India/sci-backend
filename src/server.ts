import app from './app';
import appConfig from './config/appConfig';

const port = appConfig.port;

app.listen(port, () => {
  console.log(`Local server running on http://localhost:${port}`);
});
