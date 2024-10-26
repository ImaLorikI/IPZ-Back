import { promises as fs } from "fs";
import path from "path";

const booksPath = path.join("db", "books.json");

async function listbooks() {
  try {
    const books = await fs.readFile(booksPath);
    return JSON.parse(books);
  } catch (error) {
    console.log(error.message);
  }
}

async function getBookById(bookId) {
  try {
    const books = await listbooks();
    const book = books.find((id) => id.id === bookId);
    if (!book) {
      return res.status(404).json({ message: "Not found" });
    }
    return book;
  } catch (error) {
    console.log(error.message);
     res.status(404).json({ message: "Not found" });
  }
}

async function removeBook(bookId) {
  try {
    const books = await listbooks();
    const idx = books.findIndex(({ id }) => id === bookId);
    if (idx === -1) {
      return null;
    }
    const [book] = books.splice(idx, 1);
    await fs.writeFile(booksPath, JSON.stringify(books));
    return book;
  } catch (error) {
    console.log(error.message);
  }
}

const addBook = async (body) => {
  try {
    const list = await listbooks();
    const newBook = {
      ...body,
    };
    list.push(newBook);
    await fs.writeFile(booksPath, JSON.stringify(list));
    return newBook;
  } catch (error) {
    console.log(error);
  }
};

export const updateBookById = async (id, body) => {
  try {
    const list = await listbooks();
    const index = list.findIndex((el) => el.id === id);
    if (index === -1) {
      return null;
    }
    const updatedBook = { ...list[index], ...body };
    list[index] = updatedBook;
    await fs.writeFile(booksPath, JSON.stringify(list));
    return updatedBook;
  } catch (error) {
    console.log(error);
  }
};

export { listbooks, getBookById, removeBook, addBook };
