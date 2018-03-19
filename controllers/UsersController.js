import passport from 'passport';
import mongoose from 'mongoose';
import User from '../models/user';
import Ticket from '../models/tickets';
import responseComplain from '../models/responseComplain';

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
        //res.redirect('login', {message: "Successfully logged out"});
        res.status(200).render('login', {message: 'Successful logged out', layout: 'index'});
    }
    // login(req, res) {
    //     passport.authenticate('local', {
    //         successRedirect: '/users/dashboard',
    //         failureRedirect: '/users/login'
    //     }), (req, res) => {

    //     };
    // }
    login(req, res) {
        passport.authenticate('local')(req, res, () => {
            res.redirect('/users/dashboard');
        })
    }
    enterLogin(req, res) {
        res.render('login', {layout: 'index'});
    }
    enterDashboard(req, res) {
        res.render('dashboard', {layout: 'dashboard'});
    }
    reset(req, res) {

    }
    resetPassword(req, res) {
        
    }
    forgot(req, res) {
        
    }
    forgotPassword(req, res) {

    }
    tickets(req, res) {

    }
    submit_ticket(req, res) {
        if (!req.body.subject || !req.body.complain) {
            res.render('dashboard', {message: "All fields are required"});
        }
        else {
            let tickets = new Ticket({
                _id: new mongoose.Types.ObjectId,
                subject: req.body.subject,
                date_time: Date.now(),
            });
            tickets.save((err) => {
                if (err) return res.render('dashboard', {err: err, layout: 'dashboard'});
                let respComp = new responseComplain({
                    ticket_id: tickets._id,
                    complain: req.body.complain
                });
                respComp.save((err) => {
                    if (err) return res.render('dashboard', {err: err, layout: 'dashboard'});
                    return res.render('dashboard', {message: 'Great! Your ticket has been submitted', layout: 'dashboard'});
                })
            })
        }
    }
}
