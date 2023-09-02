const express = require('express');
const { register } = require('../authLogic/register');
const { login } = require('../authLogic/login');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;