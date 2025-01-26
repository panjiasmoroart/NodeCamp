if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://172.21.176.1:27017/database_name';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const camp = new Campground({ title: 'New Seed', price: 100, description: 'cheap camping!', location: 'Mount Pangrango' });
    // await camp.save();
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // your user id in mongo
            author: '678e682a723a009b1d71491a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price: randomPrice,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dh1e1yjer/image/upload/v1737706396/NodeCamp/hemfedgq5twogri2wwbl.jpg',
                  filename: 'NodeCamp/hemfedgq5twogri2wwbl'
                },
                {
                  url: 'https://res.cloudinary.com/dh1e1yjer/image/upload/v1737706396/NodeCamp/komlgekabcuk9ouje7ts.jpg',
                  filename: 'NodeCamp/komlgekabcuk9ouje7ts'
                },
            ]            
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})