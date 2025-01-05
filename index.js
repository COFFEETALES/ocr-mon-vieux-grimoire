/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import express from 'express';
const app = express();
const port = 3000;

import mongodb from './services/mongodb-driver.js';

app.listen(
  port,
  () => {
    console.log(`Server is listening on port ${port}`);
  }
);
