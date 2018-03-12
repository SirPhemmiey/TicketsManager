import passport from 'passport';
import mongoose from 'mongoose';

const User = require('../models/user');

export default class UsersController {
    signUp(req, res) {

    }
    logout(req, res) {

    }
    login(req, res) {

    }
    userAuth(req, res) {

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
