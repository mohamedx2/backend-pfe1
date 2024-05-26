const express = require('express');
const { processMessage } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/message', processMessage);

module.exports = router;
