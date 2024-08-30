import { Router } from 'express';

import userRoutes from './usersRouters.js';
import booksRoutes from './booksRoutes.js';

const router = Router();


router.use('/users', userRoutes);
router.use('/books', booksRoutes);


export default router;