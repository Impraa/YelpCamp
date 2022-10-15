const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelpCamp");

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection error")
);
mongoose.connection.once("open", () => {
  console.log("Database connected");
});

const randArray = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 100) + 20;
    const camp = new Campground({
      author: "6330c411a944835b007f6645",
      title: `${randArray(descriptors)} ${randArray(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      descripton:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam non cumque earum! Et cum non alias, vitae ullam dolorum perferendis nostrum, nemo in mollitia, enim est adipisci cumque debitis velit.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/delnvyqsa/image/upload/v1664388034/YelpCamp/l85whqnehg3cu6ogxctg.jpg",
          filename: "YelpCamp/l85whqnehg3cu6ogxctg",
        },
        {
          url: "https://res.cloudinary.com/delnvyqsa/image/upload/v1664388034/YelpCamp/uo8xononhku50sok0tty.jpg",
          filename: "YelpCamp/uo8xononhku50sok0tty",
        },
      ],
    });
    await camp.save();
  }
};

seedDB();
