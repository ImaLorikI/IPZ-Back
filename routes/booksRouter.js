import express from "express";
import {
  getAllBooksController,
  createBookController,
  searchBooksController,
} from "../controllers/booksControllers.js";
import authenticate, { isValidId } from "../middlewares/authMiddlewares.js";

const BooksRouter = express.Router();

BooksRouter.use(authenticate);

BooksRouter.get("/", getAllBooksController);
BooksRouter.get("/search", searchBooksController);
BooksRouter.post("/", createBookController);

export default BooksRouter;
