const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

const router = (nav) => {
    authRouter.route('/signUp')
        .post((req, res) => {
            console.log(req.body);
            req.login(req.body, () => {
                res.redirect('/auth/profile');
            });
        });
        
    authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });
        
    return authRouter;
};

module.exports = router;