// const loginRequired = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     else {
//         res.status(401).render('404', {errorCode:401, error: 'Please login to continue'});
//     }
// }

// export default loginRequired;


const loginRequired = (res, res, next) => {
    //if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next()
    }

    //if they are not
    res.redirect('/login', {message: "Please login to continue"});
}