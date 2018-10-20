
import passport from 'passport';
import mongoose from 'mongoose';
import Admin from '../models/admin';
import Ticket from '../models/tickets';
import User from '../models/user';
import nodemailer from 'nodemailer';
import configEmail from '../config/email';
import responseComplain from '../models/responseComplain';


const transporter = nodemailer.createTransport('smtps://emailhere:password@smtp.gmail.com', {
    service: 'smtp.gmail.com',
    //port: 465,
    auth: {
        user: configEmail.email,
        password: configEmail.password
    }
});

export default class AdminController {
    enterDashboard(req, res) {
            let pending = 0, closed = 0;
            Ticket.find((err, tickets) => {
                tickets.forEach((ticket) => {
                    if (ticket.status == 'pending') {
                   pending++;
                    }
                    if (ticket.status == 'closed') {
                        closed++;
                         }
                })
                res.render('admin_dashboard', {
                    layout: "admin_dashboard",
                    username: req.username,
                    pending: pending,
                    closed: closed,
                    tickets: tickets});
            })
    }
    enterLogin(req, res) {
        res.status(200).render('admin_login', {message: "Please log in", layout: 'admin_index'});
    }
    login(req, res) {
        passport.authenticate('admin-local')(req, res, () => {
            //console.log(req.user);
            res.redirect('/admin/dashboard');
        })
    }
    enterSignup(req, res) {
        res.status(200).render('admin_register', {layout: 'admin_index'});
    }
    signup(req, res) {
        if (!req.body.username || !req.body.password) {
            res.render('admin_register', {message: "Please enter all fields", layout: "admin_index"});
        }
        else {
                Admin.register(new Admin({
                    username: req.body.username}), req.body.password, (err, admin) => {
                    if (err) {return res.render('admin_register', {message: err, layout: 'admin_index'});}
                    passport.authenticate('admin-local')(req, res, () => {
                        res.redirect('/admin/dashboard');
                    })
                });
        }
    }
    logout(req, res) {
        req.logout();
        res.status(200).render('admin_login', {layout: 'admin_index'});
    }
    all_tickets(req, res) {
        Ticket.find((err, tickets) => {
            res.render('all_tickets', {layout: 'admin_dashboard', tickets: tickets});
        })
    }
    delete_ticket(req, res) {

    }
    manage_ticket(req, res) {
        Ticket.findById(req.params.TicketId).populate('userId').exec((err, tickets) => {
            res.render('manage_ticket', {layout: 'admin_dashboard',
             subject: tickets.subject,
             complain: tickets.complain,
             TicketId: req.params.TicketId,
             username: tickets.userId.username
            });
        });
    }
    respond_ticket(req, res) {
        Ticket.findById(req.params.TicketId, (err, tickets) => {
            //tickets.responseId = [];
            //tickets.responseId.push(tickets._id);
            tickets.set({
                status: 'closed'});
            tickets.save((err, updatedTickets) => {
                let resp = new responseComplain({
                    ticketId: tickets._id,
                    response: req.body.response,
                    responseTime: Date.now()
                });
                resp.save((err, response) => {
                    if (err) return res.render('manage_ticket', {layout: 'admin_dashboard', message: err});
                    res.render('manage_ticket', {layout: 'admin_dashboard', message: "Great! The ticket has been responded to"});
                //send email
                User.findById(tickets.userId, (err, getUser) => {
                    const mailOptions = {
                    from: configEmail.email,
                    to: getUser.email,
                    subject: "Closed Ticket",
                    html: "<h3>Your ticket has been attended to, hence closed. Thank you!</h3>"
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    //if (err) {console.log(err)}
                    //else {console.log('Email sent: ' + info.response)}
                });
                });
                });
            });
        })
    }
}