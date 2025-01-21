module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ USER...", req.user);
    // REQ USER... {
    //     _id: new ObjectId('678e682a723a009b1d71491a'),
    //     email: 'usertesting@gmail.com',
    //     username: 'usertesting',
    //     __v: 0
    // }

    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}