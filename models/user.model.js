/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    'email': {type: String, required: true},
    'password': {type: String, required: true},
  }
);

export default mongoose.model('User', userSchema);
