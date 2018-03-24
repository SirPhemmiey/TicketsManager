const loginRequired = (req, res, next) => {
    //if user is authenticated in the session, carry on
    // let session = req.session;
    // let user = req.user;
    // console.log(session);
    // console.log(user);
    // if (session.username || user) {
    //     return next();
    // }
    // else {
    //         //if they are not
    // res.status(200).render('login', {message: 'Please login to continue', layout: 'index'});
    // }
    if(req.isAuthenticated()){
        //console.log('authenticaeted')
        return next();
    }else{
        res.status(401).render('login', {errorcode: 401, message: 'Please login again to continue', 'layout': 'index'});
    }
}

//export default loginRequired;
module.exports = loginRequired;