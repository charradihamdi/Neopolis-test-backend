

const mongoose = require("mongoose");

const EventModel = require('./models/event.model');

const mockDB = () => {

  mongoose
    .connect(
      "mongodb://localhost/events",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));


}


function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  // Resulting point.
  return { lat: y + y0, long: xp + x0 };

}


const seedEvents = async (limit = 5) => {

  for (let index = 0; index < limit; index++) {
    const { lat, long } = generateRandomPoint({ 'lat': 36.838966, 'lng': 10.304036 }, 1000, 100);

    const newPost = new EventModel({
      posterId: Math.random(100),
      title: "title " + index,
      description: "description " + index,
      category: "sport",
      location: {
        type: "Point",
        coordinates: [long, lat]
      }
    });
    try {
      const event = await newPost.save();
      console.log(event);
    } catch (err) {
      throw new Error(err)
    }
  }
}

// Usage Example.
// Generates 100 points that is in a 1km radius from the given lat and lng point.

function generateLocation(latitude, longitude, max, min = 0) {
  const EARTH_RADIUS = 6371; // km
  const DEGREE = EARTH_RADIUS * 2 * Math.PI / 360 * 1000; // 1° latitude in meters

  const r = (max * 1000) * Math.random() ** 0.5;
  const theta = Math.random() * 2 * Math.PI; // random * (360deg in radians)

  const dy = r * Math.sin(theta);
  const dx = r * Math.cos(theta);

  const newLatitude = latitude + dy / DEGREE;
  const newLongitude = longitude + dx / (DEGREE * Math.cos(deg2rad(latitude)));
  const distance = getDistanceFromLatLonInKm(latitude, longitude, newLatitude, newLongitude);

  return {
    lat: newLatitude,
    long: newLongitude,
    distance
  };
}



async function getEventsInRange(long, lat, distance = 5000) {

  const events = await EventModel.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [long, lat]
        },
        $maxDistance: distance
      }
    }
  })

  console.log(events);
  return events
}


mockDB()
// seedEvents()

getEventsInRange(10.5, 36)