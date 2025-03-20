import app from './app';

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.get('/', (req, res) => {
  res.send('Welcome to Speedcubers India');
});

app.listen(port, () => {
  console.log(`Local server running on http://localhost:${port}`);
});
