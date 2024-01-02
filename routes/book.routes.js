/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import express from 'express';

import auth from '../middleware_functions/auth.middleware.js';
import multer from '../middleware_functions/multer.middleware.js';
import sharp from '../middleware_functions/sharp.middleware.js';
import {
	addBookRating,
	createBook,
	deleteBook,
	getAllBooks,
	getOneBook,
	getTopRatedBooks,
	modifyBook
} from '../controllers/book.controller.js';

const router = express.Router()

router.get('/', getAllBooks)
router.get('/bestrating', getTopRatedBooks)
router.get('/:id', getOneBook)

router.post('/', auth, multer, sharp, createBook)
router.put('/:id', auth, multer, sharp, modifyBook)
router.delete('/:id', auth, deleteBook)
router.post('/:id/rating', auth, addBookRating)

export default router;
