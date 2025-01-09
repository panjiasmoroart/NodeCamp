if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://172.21.176.1:27017/database_name';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/makecampground', async (req, res) => {
    const createCamp = new Campground({ title: 'My Backyard', price: 100, description: 'cheap camping!', location: 'Mount Pangrango' });
    await createCamp.save();
    res.send(createCamp);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
