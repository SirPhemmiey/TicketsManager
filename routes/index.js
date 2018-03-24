import express from 'express';
import passport  from "passport";
import * as TicketsController from '../controllers/TicketsController';
import * as UsersController from '../controllers/UsersController';
import * as AdminController from '../controllers/AdminController';
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

const admin = new AdminController.default();
const tickets = new TicketsController.default();
const users = new UsersController.default();

//tickets routes
router.get('/users/dashboard', loginRequired, users.enterDashboard)
router.get('/all_tickets', tickets.seeAll);
router.get('/add', tickets.add);
router.post('/addTicket', tickets.addTicket);
router.get('/delete', tickets.delete);
router.post('/deleteTicket', tickets.deleteTicket);
router.get('/edit', tickets.edit);
router.post('/editTicket', tickets.editTicket);
router.get('/close', tickets.close);
router.post('/closeTicket', tickets.closeTicket);

//user routes
router.get('/users/login', users.enterLogin);
//router.get('/admin/login', admin.enterLogin);
router.get('/users/register', users.enterRegister);
router.get('/users/tickets', loginRequired, users.seeAllTickets);
router.post('/users/submit_ticket', loginRequired, users.submit_ticket);
router.post('/users/register', users.signUp);
// router.post('/users/login', passport.authenticate('local'), function(req, res) {
//     res.redirect('/users/dashboard');
// });
router.post('/users/login', users.login);
router.get('/users/logout', users.logout);
router.get('/forgot', users.forgot);
router.get('/reset', users.reset);
router.post('/forgotpass', users.forgotPassword);
router.post('/resetpass', users.resetPassword);

router.get('/admin/login', admin.enterLogin);
router.post('/admin/login', admin.login);
router.get('/admin/logout', admin.logout);
router.get('/admin/signup', admin.enterSignup);
router.post('/admin/signup', admin.signup);
router.get('/admin/dashboard', admin.enterDashboard);
router.get('/admin/all_tickets', admin.all_tickets);
router.post('/admin/delete_ticket/:TicketId', admin.delete_ticket);
router.get('/admin/manage_ticket/:TicketId', admin.manage_ticket);
router.post('/admin/respondTicket/:TicketId', admin.respond_ticket);



//export default router;
module.exports = router;


