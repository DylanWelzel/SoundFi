const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateCreate } = require('../../utils/songValidations');

const songValidations = require('../../utils/songValidations')

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs);
}));

router.post('/', requireAuth, songValidations.validateCreate, asyncHandler(async (req, res) => {
    const song = await Song.create(req.body);
    return res.json(song);
}));

router.delete("/", requireAuth, asyncHandler(async function (req, res) {
    const song = await Song.delete(req.body);
    return res.json({ song });
}));


module.exports = router;
