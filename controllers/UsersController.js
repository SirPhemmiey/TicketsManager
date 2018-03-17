import passport from 'passport';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import User from '../models/user';

export default class UsersController {
    index(req, res) {
        res.render('index');
    }
    enterRegister(req, res) {
        res.render('register', {layout: 'index'});
    }
    signUp(req, res) {
        if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.password) {
            res.render('register', {error: "Please fill in all required fields"});
        }
        else {
            User.register(new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email
            }), req.body.password, (err, user) => {
                if (err) {return res.render('register', {message: err, layout: 'index'})}
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/users/dashboard');
                })
            })
        //     User.register({
        //         first_name: req.body.first_name,
        //         last_name: req.body.last_name,
        //         username: req.body.username,
        //         email: req.body.email, 
        //     },  req.body.password, 
        // (err, user) => {
        //     if (err) {return res.render('register', {message: err, layout: 'index'});}
        //     // passport.authenticate('local')(req, res, () => {
        //     //     res.redirect('/users/dashboard');
        //     //     // successRedirect: '/users/dashboard';
        //     //     // failureRedirect: '/users/register',
        //     //     // failureFlash: true
        //     // })
        //     //let authenticate = User.authenticate();
        //     // authenticate('username', 'password', (err, result) => {
        //     //     if (err) {return res.render('register', {message: err, layout: 'index'});}
        //     //     res.redirect('/users/dashboard');
        //     // })
        // })
        // }
    }
}
    logout(req, res) {
        req.logout();
        res.redirect('login', {message: "Successfully logged out"});
    }
    login(req, res) {

    }
    auth(req, res) {

    }
    enterLogin(req, res) {
        res.render('login', {layout: 'index'});
    }
    enterDashboard(req, res) {
        res.render('dashboard');
    }
    reset(req, res) {

    }
    resetPassword(req, res) {
        
    }
    forgot(req, res) {
        
    }
    forgotPassword(req, res) {

    }
}
