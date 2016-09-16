const express = require('express');
const mongodb = require('mongodb').MongoClient;
const adminRouter = express.Router();

const books = [
    {
        title: 'My Book',
        author: 'Me Obviously'
    }, 
    {
        title: 'Not My Book',
        author: 'Not Me Obviously'
    }, 
    {
        title: 'Your Book',
        author: 'You Obviously'
    }, 
    {
        title: 'Not Your Book',
        author: 'Not You Obviously'
    }
];
    

const router = (nav) => {
    
    adminRouter.route('/addBooks')
        .get((req, res) => {
            const url = 'mongodb://' + process.env.IP + ':27017/libraryApp';
            
            mongodb.connect(url, (err, db) => {
                if (err) { console.log(err); }
                const collection = db.collection('books');
                collection.insertMany(books, (err, results) => {
                    if (err) { console.log(err); }
                    res.send(results);
                    db.close();
                });
            });
        });
    
    return adminRouter;
};


module.exports = router;