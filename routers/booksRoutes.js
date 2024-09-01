import { Router } from 'express';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';

import bookSchema from '../schemas/booksSchema.js';

import bookController from '../controllers/booksController.js';

const router = Router();



//apis

router.post("/add",authenticate  ,validate(bookSchema.addBook,'body'), bookController.addBook);
router.get("/list", authenticate ,validate(bookSchema.getBooks,'body'), bookController.getBooks);

export default router;