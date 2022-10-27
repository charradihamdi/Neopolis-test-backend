const router = require("express").Router();
const eventsController = require("../controllers/events.controller");
const multer = require("multer");
const upload = multer();

// auth
router.post("/addevents", eventsController.addEvent);
router.get("/getevents",upload.single("file"), eventsController.getAllEvents);
router.get("/:id", eventsController.eventInfo);
module.exports = router;
