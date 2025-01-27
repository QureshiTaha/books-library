const express = require('express');
const testing = require('./testing');
const users = require('./users');
const books = require('./books');

const router = express.Router();
router.use('/testing', testing);
router.use('/users', users);
router.use('/books', books);

module.exports = router;
