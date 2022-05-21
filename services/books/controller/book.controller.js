'use strict';
import { createBook as createBookService, getAllBooks as getAllBooksService} from '../service/book.service.js'

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

export { getAllBooks, createBook};