import { Router } from 'express';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';
import checkAdmin from "../middlewares/checkAdmin.js";

import adminSchema from '../schemas/adminSchema.js';

import adminController from '../controllers/adminController.js';



const router = Router();



//apis

router.post("/categories/add",authenticate,checkAdmin,validate(adminSchema.addCategory),adminController.addCategory);
router.get("/users/list",authenticate,checkAdmin, validate(adminSchema.getUsers),adminController.getUsers );
router.delete("/users/delete",authenticate,checkAdmin,validate(adminSchema.deleteUser),adminController.deleteUser );
router.get("/reviews/delete",authenticate,checkAdmin, validate(adminSchema.deleteReview),adminController.deleteReview );

export default router;




