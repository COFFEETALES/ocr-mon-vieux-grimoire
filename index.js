/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import bookRoutes from './routes/book.routes.js';
import mongodb from './services/mongodb-driver.service.js';
import userRoutes from './routes/user.routes.js';
import { config } from './core/config.js';

const app = express();
const port = config['SERVER_PORT'];

app.use(express.json());

app.use(
  (req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    );
    res.setHeader(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
  }
);

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(
  port,
  () => {
    console.log(`Server is listening on port ${port}`);
    mongodb();
  }
);
