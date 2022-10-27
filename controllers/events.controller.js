const EventModel = require('../models/event.model');
const ObjectID = require("mongoose").Types.ObjectId;
module.exports.addEvent = async (req, res) => {
    const {title, description,category} = req.body

  const newPost = new EventModel({
    posterId: req.body.posterId,
    title: title,
    description: description,
    category:category
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
    EventModel.find((err, event) => {
        if (!err) res.send(event);
        else console.log("Error to get data : " + err);
      })
  }

  module.exports.eventInfo = async (req,res)=>{
 
      if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    
        EventModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
      })
  }