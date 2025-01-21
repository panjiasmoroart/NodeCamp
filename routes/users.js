const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        res.send(req.body);
    }catch(err) {
        console.log(err);
        res.redirect('register');
    }
}));

module.exports = router;
