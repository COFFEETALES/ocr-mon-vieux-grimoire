/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import mongoose from 'mongoose';

import { config } from '../core/config.js';

const dbURI = 'mongodb://localhost:27017/your-database-name';

mongoose.connect(
  dbURI
).then(
  () => console.log('Connected to MongoDB')
).catch(
  error => console.error('MongoDB connection error:', error)
);

export default function () {
  
};
