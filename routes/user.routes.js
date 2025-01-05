/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import express from 'express';
import { userSignup, userLogin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);

export default router;
