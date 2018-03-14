import express from 'express';
import passport  from "passport";
import * as TicketsController from '../controllers/TicketsController';
import * as UsersController from '../controllers/UsersController';
//import * as AdminController from '../controllers/AdminController';
//const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

//const admin = new adminController.default();
const tickets = new TicketsController.default();
const users = new UsersController.default();

//tickets routes
router.get('/dashboard', users.enterDashboard)
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
router.post('/users/auth', users.auth);
router.get('/logout', users.logout);
router.get('/forgot', users.forgot);
router.get('/reset', users.reset);
router.post('/forgotpass', users.forgotPassword);
router.post('/resetpass', users.resetPassword);



//export default router;
module.exports = router;


