'use strict';
import {createBook as createBookRepostory, getAllBooks as getAllBooksRepostory,
        getBookWithID as getBookWithIDRepository, deleteBook as deleteBookRepository} from '../repository/book.repository.js'


let getAllBooks = function(request, response) {
    getAllBooksRepostory(request, function(err, aListOfBooks) {
        if (err){
            response(err, null);
        }else{
            response(null, aListOfBooks);
        }
    });
};

let createBook = function(req, res) {
    createBookRepostory(req, function(err, createdBook) {
        if (err){
            res(err, null);
        }else{
            res(null, createdBook);
        }
    });
};

let getBookWithID = function(request, response) {
    getBookWithIDRepository(request, function(err, foundBook) {
        if (err){
            response(err, null);
        }else{
            response(null, foundBook);
        }
    })
}

let deleteBook = function(request, response) {
    deleteBookRepository(request, function(err, bookToDelete) {
        if (err){
            response(err, null);
        }else{
            response(null, bookToDelete);
        }
    })
}

export {getAllBooks, createBook, getBookWithID, deleteBook};