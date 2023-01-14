const router = require("express").Router();
const Event = require("../model/eventModel");
const { eventValidation } = require("../validation");

//CREATE EVENT
router.post("/", async (req, res) => {
  //validating the data before making an event
  const { error } = eventValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Create an event
  const event = new Event({
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
  });
  try {
    const savedEvent = await event.save();
    res.send({ event: event._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL EVENTS
router.get("/", async (req, res, next) => {
  try {
    const results = await Event.find();
    res.status(201).json({
      status: "success",
      data: {
        events: results,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET EVENT BY ID
// example req: http://localhost:8000/api/v1/events/id?id=63c1ee7e4d8dffeb127aceb1
router.get("/id", async (req, res, next) => {
  const id = req.query.id;
  try {
    const event = await Event.findById(id);
    res.status(201).json({
      status: "success",
      data: {
        events: event,
      },
    });

    // res.send(event);
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET EVENT BY DAYOFWEEK
//example req: http://localhost:8000/api/v1/events/dayOfWeek?dayOfWeek=monday
router.get("/dayOfWeek", async (req, res, next) => {
  const dayOfWeek = req.query.dayOfWeek;
  try {
    const event = await Event.find({ dayOfWeek: dayOfWeek });
    res.status(201).json({
      status: "success",
      data: {
        events: event,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//DELETE EVENT BY ID
//req example: http://localhost:8000/api/v1/events/id?id=63c2438ff9d7d4243eaecffd
router.delete("/id", async (req, res, next) => {
  const id = req.query.id;
  try {
    const idAux = await Event.findOne({ id: req.body._id });
    if (!idAux) return res.status(400).send("Id is not found");
    const result = await Event.findByIdAndDelete(id);
    res.status(201).json({
      status: "deleted succesfully",
      data: {
        events: result,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//DELETE EVENT BY DAYOFWEEK
//example req: http://localhost:8000/api/v1/events/dayOfWeek?dayOfWeek=friday
router.delete("/dayOfWeek", async (req, res, next) => {
  const dayOfWeek = req.query.dayOfWeek;
  try {
    const event = await Event.deleteMany({ dayOfWeek: dayOfWeek });
    res.status(201).json({
      status: "deleted successfully",
      data: {
        events: event,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
