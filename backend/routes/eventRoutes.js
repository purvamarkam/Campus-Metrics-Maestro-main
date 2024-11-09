const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); // Adjust path if needed

// Route to create a new event
router.post('/events', eventController.createEvent);

// (Optional) Route to get all events
router.get('/events', eventController.getEvents);

module.exports = router;


/* // routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');

const router = express.Router();

// Route to create a new event
router.post('/events', createEvent);

// Route to get all events (optional)
router.get('/events', getEvents);

module.exports = router;
 */