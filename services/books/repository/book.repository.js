'use strict';
import { Book } from '../db/Book.js'

let getAllBooks =  async function(req, res) {
  const allBooks = await Book.find()
  if (err){
    res(err, null);
}else{
    res(null, allBooks);
}
};

let createBook =  async function(req, res) {
  let bookData = req.body;
  const newBook = await Book.create(bookData)
  console.log(newBook)
  if (err){
    res(err, null);
}else{
    res(null, newBook);
}
};

let getBookWithID = async function(req, res){
  let bookID = req.body
  const foundBook = await Book.findById(bookID)
  console.log(foundBook)
  if (err){
    res(err, null);
}else{
    res(null, foundBook);
}
}

let deleteBook = async function(req, res){
  let bookID = req.body
  const deletedBook = await Book.deleteOne({_id: bookID})
  if (err){
    res(err, null);
}else{
    res(null, deletedBook);
}
}

export { getAllBooks , createBook, getBookWithID, deleteBook};