const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const songId = req.params.id
    const song = await Song.findByPk(songId)
    return res.json(song)
}));

const songValidations = [
    check('songName')
        .notEmpty()
        .withMessage('Song name must not be empty.'),
    check('songLink')
        .notEmpty()
        .withMessage('Song Link must not be empty.'),
    handleValidationErrors
]

router.post('/:id', requireAuth, songValidations, asyncHandler(async (req, res) => {

    const song = await Song.create(req.body);

    return res.json(song);
}));

router.delete('/:id', requireAuth, asyncHandler(async function (req, res) {
    const song = await Song.findByPk(req.params.id)
    if (!song) throw new Error('Cannot find song');
    await Song.destroy({ where: { id: song.id } });

    return res.json(song)

}));

router.put('/:id', requireAuth, songValidations, asyncHandler(async function (req, res) {
    const id = req.params.id
    const originalSong = await Song.findByPk(id)
    if (!originalSong) throw new Error('Cannot find song');
    const { songName, songLink, userId, albumImage } = req.body
    const updatedSong = await originalSong.update(
        {
            id,
            songName,
            songLink,
            albumImage,
            userId
        }
    )
    return res.json(updatedSong);
}));




module.exports = router;
