import { Router } from 'express';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';

import userSchema from '../schemas/usersSchema.js';

import userController from '../controllers/usersController.js';



const router = Router();



//apis

router.post("/registration", validate(userSchema.registration,'body'),  userController.registration);
router.post("/login", validate(userSchema.login,'body'),  userController.login);




export default router;