import { Router } from 'express';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';

import reviewsSchema from "../schemas/reviewsSchema.js";

import reviewsController from "../controllers/reviewsController.js";



const router = Router();



//apis

router.post("/add", authenticate,validate(reviewsSchema.createReview,'body'),  reviewsController.createReview);
router.get("/list", authenticate,validate(reviewsSchema.getReviews,'body'),  reviewsController.getReviewsByBookId);




export default router;