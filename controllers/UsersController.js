import passport from 'passport';
import mongoose from 'mongoose';

const User = require('../models/user');

export default class UsersController {
    index(req, res) {
        res.render('index');
    }
    enterRegister(req, res) {
        res.render('register');
    }
    signUp(req, res) {
        if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !re.body.password) {
            res.render('register', {error: "Please fill in all required fields"});
        }
        else {
            User.register(new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password 
            }))
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
        res.render('login');
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
