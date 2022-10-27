const EventModel = require('../models/event.model');
const ObjectID = require("mongoose").Types.ObjectId;
const url = require('url')


module.exports.addEvent = async (req, res) => {
  const { title, description, category } = req.body

  const newPost = new EventModel({
    posterId: req.body.posterId,
    title: title,
    description: description,
    category: category
  });
  console.log(newPost)
  try {
    const event = await newPost.save();
    return res.status(201).json(event);
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports.getAllEvents = async (req, res) => {

  const { lat, long, distance } = url.parse(req.url, true).query;

  if (!lat || !long) {
    res.status(400).json({ error: "latitude and longitude  are required" })
  }

  const MAX_DISTANCE = 1000 * 10
  try {
    const events = await EventModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat]
          },
          $maxDistance: distance || MAX_DISTANCE
        }
      }
    })


    res.json(events)

  } catch (error) {
    throw new Error(error)

  }
}

module.exports.eventInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const event = await EventModel.findById(req.params.id)

    if (!event) {
      res.status(404).json({ error: "Event Notfound" })
    }

    res.json(event)

  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.delete = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const event = await EventModel.deleteOne(req.params.id)

    if (!event) {
      res.status(404).json({ error: "Event Notfound" })
    }

    res.status(200)

  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports.edit = async (req, res) => {

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const { title, description, category } = req.body

  try {
    const event = await EventModel.findById(req.params.id)

    if (!event) {
      res.status(404).json({ error: "Event Notfound" })
    }

    event = { ...event, title, description, category }
    event.save()

    res.status(200).json(event)

  } catch (error) {
    res.status(500).json({ error: error })
  }
}