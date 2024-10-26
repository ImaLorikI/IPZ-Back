import { getAllBooks, createBook, searchBooks } from "../services/bookServices.js";

export const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const createBookController = async (req, res) => {
  try {
    const newBook = await createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating book" });
  }
};

export const searchBooksController = async (req, res) => {
  try {
    const { name, author, genre } = req.query;
    if (!name && !author && !genre) {
      return res.status(400).json({ message: "At least one search parameter (name, author, or genre) is required" });
    }
    const searchCriteria = name ? { name } : author ? { author } : { genre };
    const books = await searchBooks(searchCriteria);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching books" });
  }
};
