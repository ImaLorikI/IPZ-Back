import { Books } from "../models/books.js";

export const getAllBooks = async () => {
  try {
    const books = await Books.find();
    return books;
  } catch (error) {
    throw new Error("Error fetching books: " + error.message);
  }
};

export const createBook = async (bookData) => {
  try {
    const newBook = await Books.create(bookData);
    return newBook;
  } catch (error) {
    throw new Error("Error creating book: " + error.message);
  }
};

export const searchBooks = async (searchCriteria) => {
  try {
    const field = Object.keys(searchCriteria)[0];
    const value = searchCriteria[field];
    const query = { [field]: { $regex: value, $options: 'i' } };
    const books = await Books.find(query);
    return books;
  } catch (error) {
    throw new Error("Error searching books: " + error.message);
  }
};
