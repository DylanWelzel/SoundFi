const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateCreate } = require('../../utils/songValidations');

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs);
}));

router.post('/', requireAuth, validateCreate, asyncHandler(async (req, res) => {
    const song = await Song.create(req.body);
    res.json(song);
    return song
}));

module.exports = router;
