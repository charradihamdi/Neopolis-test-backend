const router = require("express").Router();
const eventsController = require("../controllers/events.controller");
const multer = require("multer");
const upload = multer();

// auth
router.post("/add", eventsController.addEvent);
router.get("/:id", eventsController.eventInfo);
router.put("/:id/edit", eventsController.edit);
router.delete("/:id", eventsController.delete);
router.get("", upload.single("file"), eventsController.getAllEvents);
module.exports = router;
