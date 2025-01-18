if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')))
const ExpressError = require('./utils/ExpressError');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

const dbUrl = process.env.DB_URL || 'mongodb://172.21.176.1:27017/database_name';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render("home");
});

// more errors 
app.all(/(.*)/, (req, res, next) => {
    // res.send("404!!!!");
    next(new ExpressError('page not found', 404));
});

app.use((err, req, res, next) => {
    // res.send('error, something went wrong!');
    // const { statusCode = 500, message = 'something went wrong' } = err;
    // res.status(statusCode).send(message);
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'something went wrong'
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
