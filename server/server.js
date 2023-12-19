const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const HTTP_PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.get('/Export', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.get('/Import', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.get('/Logs', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.get('/api', (req, res) => {
  res.json({ users: ['user1', 'user2', 'user3'] });
});

const startServer = () => {
  app.listen(HTTP_PORT, () => {
    console.log(`app listening on: ${HTTP_PORT}`);
  });
};
startServer();
