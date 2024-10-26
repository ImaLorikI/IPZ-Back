import express from "express";

import {
  registerUser,
  login,
    getCurrent,
    logoutUser,
    addToWishlistController,
    removeFromWishlistController,
    getWishlistController
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authMiddlewares.js";
import { registerUserSchema, wishlistActionSchema } from "../schemas/userSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

authRouter.post("/login", validateBody(registerUserSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.post("/wishlist", authenticate, validateBody(wishlistActionSchema), addToWishlistController);

authRouter.delete("/wishlist", authenticate, validateBody(wishlistActionSchema), removeFromWishlistController);

authRouter.get("/wishlist", authenticate, getWishlistController);

export default authRouter;
