const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models');


router.get('/:songId', asyncHandler(async (req, res) => {
    const songId = req.params.songId
    const song = await Song.findByPk(songId)
    return res.json(song);
}));




module.exports = router;
