'use strict';
import { createBook as createBookService, getAllBooks as getAllBooksService, 
         getBookWithID as getBookWithIDService, deleteBook as deleteBookService} from '../service/book.service.js'

let getAllBooks = function(request, response) {
    getAllBooksService(request, function(err, aListOfBooks) {
        if (err){
            response(err, null);
        }else{
            response(null, aListOfBooks);
        }
    });
};

let createBook = function(req, res) {
    createBookService(req, function(err, bookInfo) {
        if (err){
            res(err, null);
        }else{
            res(null, bookInfo);
        }
    });
};

let getBookWithID = function(request, response) {
    getBookWithIDService(request, function(err, foundBook) {
        if (err){
            response(err, null);
        }else{
            response(null, foundBook);
        }
    })
}

let deleteBook = function(request, response) {
    deleteBookService(request, function(err, bookToDelete) {
        if (err){
            response(err, null);
        }else{
            response(null, bookToDelete);
        }
    })
}

export { getAllBooks, createBook, getBookWithID, deleteBook};