/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import fs from 'fs';
import sharp from 'sharp';

sharp.cache(false);

export default (
  async (req, res, next) => {
    if (req.file) {
      try {
        const newFilename = req.file.filename.replace(/\.[^.]+$/, ".rewrk.webp");
        const savedPath = req.file.path;
        await sharp(
          req.file.path
        ).webp(
          {quality: 50}
        ).toFile(
          ['images', newFilename].join('/'),
          (err) => {
            err || fs.unlinkSync(savedPath);
          }
        );
        req.file.path = ['images', newFilename].join('/');
        req.file.filename = newFilename;
        req.file.mimetype = 'image/webp';
      } catch (error) {
        return (
          res.status(500).json({message: 'Failed to compress image', error})
        );
      }
    }
    next();
  }
);
