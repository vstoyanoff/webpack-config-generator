const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rimraf = require('rimraf');
const generateFiles = require('./lib/generateFiles');

const app = express().use(
  '*',
  cors({
    origin: 'https://mobb.dev',
    optionsSuccessStatus: 200,
  })
);

app.get('/download', (req, res) => {
  const id = req.query.id;
  res.download(`./generated/${id}.zip`);
});

app.get('/remove', (req, res) => {
  const id = req.query.id;
  rimraf.sync(`./generated/${id}.zip`);
  res.status(200);
});

app.post('/generate', bodyParser.json(), async (req, res, next) => {
  const id = await generateFiles(req.body);
  res.status(200);
  res.send({ id });
});

module.exports = app;
