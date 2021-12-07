const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const songName = check('songName')
    .notEmpty()
    .withMessage('Song name must not be empty.');

const songLink = check('songLink')
    .notEmpty()
    .withMessage('Song Link must not be empty.');

const validateCreate = [
    songName,
    songLink,
    handleValidationErrors,
];

exports.validateCreate = validateCreate;
