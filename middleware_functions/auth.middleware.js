/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import jwt from 'jsonwebtoken';

import { config } from '../core/config.js';

export default (
  (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ', 2).pop();
      const decodedToken = jwt.verify(token, config['JWT_SECRET_TOKEN']);
      const userId = decodedToken.userId;
      req.auth = {userId};
      next();
    } catch(error) {
      res.status(401).json({error})
    }
  }
);
