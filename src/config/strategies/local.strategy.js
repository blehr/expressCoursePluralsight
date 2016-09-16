const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    (username, password, done) => {
        const user = {
            username: username,
            password: password
        };
        done(null, user);
    }));
};