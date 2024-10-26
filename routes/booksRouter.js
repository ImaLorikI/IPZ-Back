import express from "express";
import {
  getAllBooks,
  getOneBook,
  deleteBook,
  createBook,
  updateBook,
  updateStatus,
} from "../controllers/booksControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createBookSchema,
  updateBookSchema,
  patchBookSchema,
} from "../schemas/bookSchemas.js";
import authenticate, { isValidId } from "../middlewares/authMiddlewares.js";

const BooksRouter = express.Router();

BooksRouter.use(authenticate);

BooksRouter.use("/:id", isValidId);


BooksRouter.get("/", getAllBooks);

BooksRouter.get("/:id", getOneBook);

BooksRouter.delete("/:id", deleteBook);

BooksRouter.post("/", validateBody(createBookSchema), createBook);

BooksRouter.put("/:id", validateBody(updateBookSchema), updateBook);

BooksRouter.patch(
  "/:id/favorite",
  validateBody(patchBookSchema),
  updateStatus
);

export default BooksRouter;
