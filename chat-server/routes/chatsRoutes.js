const express = require('express');
const { getChats } = require('../chatsLogic/getChats');

const router = express.Router();

router.get('/', getChats);

module.exports = router;