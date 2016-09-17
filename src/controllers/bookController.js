const mongodb = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const bookController = (bookService, nav) => {
    
    
    
    const middleware = (req, res, next) => {
    //   if (!req.user) {
    //       res.redirect('/');
    //   }
       
       next();

    };
    
    const getIndex = (req, res) => {
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
    };
    
        
    
    const getById = (req, res) => {
        const id = new objectId(req.params.id);
        const url = 'mongodb://' + process.env.IP + ':27017/libraryApp';
        
        mongodb.connect(url, (err, db) => {
            if (err) { console.log(err); }
            const collection = db.collection('books');
            
            collection.findOne({_id: id}, (err, results) => {
                if (err) { console.log(err); }
                bookService.getBookById(results.bookId, (err, book) => {
                    if (err) { console.log('bookController Error: ' + err); }
                        results.book = book;
                        res.render('bookView', {
                        title: 'Books', 
                        nav: nav,
                        book: results
                    });
                    db.close();
                });
            });
        });
    
    };
        
        
    
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
    
};


module.exports = bookController;