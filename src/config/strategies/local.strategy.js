const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    (username, password, done) => {
        
        const url = 'mongodb://' + process.env.IP + ':27017/libraryApp';
        
         mongodb.connect(url, (err, db) => {
            if (err) { console.log(err); }
            
            const collection = db.collection('users');
            collection.findOne({ username: username },
                (err, results) => {
                    if (err) { console.log(err); }
                    if (results.password === password) {
                        const user = results;
                    
                        done(null, user);
                    } else {
                        done(null, false, {message: 'Bad Password'});
                    }
                    
                });
         });
    }));
};