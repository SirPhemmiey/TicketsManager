const loginRequired = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).render('404', {errorCode:401, error: 'Please login to continue'});
    }
}

export default loginRequired;