// const loginRequired = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     else {
//         res.status(401).render('404', {errorCode:401, error: 'Please login to continue'});
//     }
// }

// export default loginRequired;


const loginRequired = (req, res, next) => {
    //if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next()
    }

    //if they are not
    //res.redirect.status(200).('/login', {message: "Please login to continue"});
    res.status(200).render('login', {message: 'Please login to continue', layout: 'index'});
}

//export default loginRequired;
module.exports = loginRequired;