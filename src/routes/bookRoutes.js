const express = require('express');
const mongodb = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const bookRouter = express.Router();

const router = nav => {
    
    bookRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://' + process.env.IP + ':27017/libraryApp';
            
            mongodb.connect(url, (err, db) => {
                if (err) { console.log(err); }
                const collection = db.collection('books');
                
                collection.find().toArray( (err, results) => {
                    if (err) { console.log(err); }
                     res.render('bookListView', {
                        title: 'Books', 
                        nav: nav,
                        books: results
                    });
                    db.close();
                });
            });
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const id = new objectId(req.params.id);
            const url = 'mongodb://' + process.env.IP + ':27017/libraryApp';
            
            mongodb.connect(url, (err, db) => {
                if (err) { console.log(err); }
                const collection = db.collection('books');
                
                collection.findOne({_id: id}, (err, results) => {
                    if (err) { console.log(err); }
                     res.render('bookView', {
                        title: 'Books', 
                        nav: nav,
                        book: results
                    });
                    db.close();
                });
            });
        });
    
    return bookRouter;
};



module.exports = router;