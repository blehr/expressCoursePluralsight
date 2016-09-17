const express = require('express');
// const mongodb = require('mongodb').MongoClient;
// const objectId = require('mongodb').ObjectID;
const bookRouter = express.Router();


const router = nav => {
    
    
    const bookService = require('../services/goodReadsService')();
    const bookController = require('../controllers/bookController')(bookService, nav);
    
    // secure route
    bookRouter.use(bookController.middleware);
    
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);
    
    return bookRouter;
};



module.exports = router;