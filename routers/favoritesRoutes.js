import { Router } from 'express';

import validate from '../middlewares/validate.js';
import authenticate from '../middlewares/auth.js';

import favoritesSchemas from "../schemas/favoritesSchemas.js";

import favoritesController from "../controllers/favoritesController.js";



const router = Router();


//apis

router.post("/add", authenticate,validate(favoritesSchemas.addFavorite,'params'),favoritesController.addFavorite);
router.get("/list", authenticate,validate(favoritesSchemas.getFavorites,'params'),  favoritesController.getFavorites);

export default router;