module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'please login to view this resource');
        res.redirect('/users/login');
    },

    allowAdmin : function(req,res,next) {
        if(req.isAuthenticated() && (req.user.role === 'Admin')) return next();
        res.redirect('/users/login')
    }
}