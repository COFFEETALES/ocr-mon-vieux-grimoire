/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import mongoose from 'mongoose';

import { config } from '../core/config.js';

const dbURI = config['MONGODB_URL'];

export default function () {
  mongoose.connect(
    dbURI
  ).then(
    () => console.log('Connected to MongoDB')
  ).catch(
    error => console.error('MongoDB connection error:', error)
  );
};
