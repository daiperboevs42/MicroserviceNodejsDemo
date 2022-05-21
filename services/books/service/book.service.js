'use strict';
import {createBook as createBookRepostory, getAllBooks as getAllBooksRepostory} from '../repository/book.repository.js'


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

export {getAllBooks, createBook};