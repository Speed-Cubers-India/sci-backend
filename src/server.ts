import app from './app';
import appConfig from './config/appConfig';

const port = appConfig.port;

app.get('/', (req, res) => {
  res.send('Welcome to Speedcubers India');
});

app.listen(port, () => {
  console.log(`Local server running on http://localhost:${port}`);
});
