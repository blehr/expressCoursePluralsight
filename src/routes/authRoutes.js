const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

const router = (nav) => {
    authRouter.route('/signUp')
        .post((req, res) => {
            console.log(req.body);
            
            const url = 'mongodb://' + process.env.IP + ':27017/libraryApp';
            
            mongodb.connect(url, (err, db) => {
                if (err) { console.log(err); }
                const collection = db.collection('users');
                const user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                
                collection.insert(user, (err, results) => {
                    if (err) {console.log(err);}
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });
        
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }),
        (req, res) => {
            res.redirect('/auth/profile');
        });
        
    authRouter.route('/profile')
        // secure route
        .all((req, res, next) => {
            if(!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get((req, res) => {
            res.json(req.user);
        });
        
    return authRouter;
};

module.exports = router;