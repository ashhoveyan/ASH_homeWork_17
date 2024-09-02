import { Router } from 'express';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';

import commentsSchema from "../schemas/commentsSchema.js";

import commentsController from "../controllers/commentsController.js";



const router = Router();



//apis

router.post("/add/comment", authenticate,validate(commentsSchema.reviewId,'query'), validate(commentsSchema.addComments,'body'), commentsController.addComments);
router.get("/list", authenticate,validate(commentsSchema.reviewId,'query'),  commentsController.getComments);

export default router;