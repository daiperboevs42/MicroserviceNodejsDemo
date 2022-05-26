'use strict';
import {  } from '../db/mongoseDB.js'
import { Book } from '../db/Book.js'


let getAllBooks =  async function(req, res) {
  const allBooks = await Book.find().catch(err =>{
    res(err, null);
  });
    res(null, allBooks);
};

let createBook =  async function(req, res) {
  const newBook = await Book.create(req).catch(err =>{
    res(err, null);
  });
    res(null, newBook);
};

let getBookWithID = async function(req, res){
  const foundBook = await Book.findById(req).catch(err =>{
    res(err, null);
  });
    res(null, foundBook);
}

let deleteBook = async function(req, res){
  const deletedBook = await Book.deleteOne({_id: req}).catch(err =>{
    res(err, null);
});
    res(null, deletedBook);
}

let findBookMessage = async function(){
  const foundBook = await Book.find();
  return foundBook;
}

export { getAllBooks , createBook, getBookWithID, deleteBook, findBookMessage};