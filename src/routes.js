const express = require('express');
const shorttyController = require('./controllers/shorttyController')

const router = express.Router();

//Create the shortty
router.post('/createShortty', shorttyController.createURL);

//Redirect to URL
router.get('/:code', shorttyController.getURL)

module.exports = router;