import { Router } from 'express';

import userRoutes from './usersRouters.js';
import booksRoutes from './booksRoutes.js';
import reviewsRoutes from "./reviewsRoutes.js";

const router = Router();


router.use('/users', userRoutes);
router.use('/books', booksRoutes);
router.use('/reviews', reviewsRoutes);


export default router;