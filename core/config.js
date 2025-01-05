/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import dotenv from 'dotenv';

dotenv.config();

const missingEnvError = (
  function () {
    throw Error('');
  }
);

export const config = (
  {
    'SERVER_PORT': process.env['MON_VIEUX_GRIMOIRE__SERVER_PORT'] || missingEnvError(),
    'MONGODB_URL': process.env['MON_VIEUX_GRIMOIRE__MONGODB_URL'] || missingEnvError(),
    'JWT_SECRET_TOKEN': process.env['MON_VIEUX_GRIMOIRE__JWT_SECRET_TOKEN'] || missingEnvError(),
    'SHA_512_SALT': process.env['MON_VIEUX_GRIMOIRE__SHA_512_SALT'] || missingEnvError()
  }
);
