/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import multer from 'multer';

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(Error("Le format de l'image n'est pas valide."));
  }
};

const storage = multer.diskStorage(
  {
    destination: (
      (req, file, cb) => {
        cb(null, 'images');
      }
    ),
    filename: (
      (req, file, cb) => {
        const extension = MIME_TYPES[file.mimetype];
        const uniq = [Date.now(), Math.round(Math.random() * 1E9)].join('-');
        cb(null, uniq + '.' + extension);
      }
    )
  }
);

export default multer({storage: storage, fileFilter: fileFilter}).single('image');
