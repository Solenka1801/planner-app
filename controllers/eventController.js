const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const Event =require('../models/eventModel');


const fs = require('fs');

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/events.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Event id is: ${val}`);

  if (req.params.id * 1 > events.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.description || !req.body.dayOfWeek) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing description or dayOfWeek'
    });
  }
  next();
};

exports.getAllEvents = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: events.length,
    data: {
      events
    }
  });
};

exports.getEvent = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const event = events.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
};

exports.createEvent = async(req, res) => {
  
  const {description, dayOfWeek} = req.body
  const newEvent = new Event({description, dayOfWeek});
  const eventSaved = await newEvent.save()
  res.status(201).json(eventSaved)

  /*
  
  console.log(req.body);

  const newId = events[events.length - 1].id + 1;
  const newEvent = Object.assign({ id: newId }, req.body);

  events.push(newEvent);

  fs.writeFile(
    `${__dirname}/../dev-data/data/events.json`,
    ///dev-data/data/events.json`,
    JSON.stringify(events),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          event: newEvent
        }
      });
    }
  );*/
};

exports.updateEvent = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      event: '<Updated event here...>'
    }
  });
};

exports.deleteEvent = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
