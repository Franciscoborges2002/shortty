const express = require('express');
const shorttyController = require('./controllers/shorttyController')

const router = express.Router();

router.get('/getShortty/:id', shorttyController.getURL)
router.post('/createShortty', shorttyController.createURL);

module.exports = router;