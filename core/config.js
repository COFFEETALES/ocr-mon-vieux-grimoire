/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import dotenv from 'dotenv';

dotenv.config();

export const config = (
  {
    'SERVER_PORT': process.env['MON_VIEUX_GRIMOIRE__SERVER_PORT'],
    'MONGODB_URL': process.env['MON_VIEUX_GRIMOIRE__MONGODB_URL'],
  }
);
