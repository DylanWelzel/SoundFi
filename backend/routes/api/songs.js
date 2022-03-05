const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Song, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const songId = req.params.id;
    const song = await Song.findByPk(songId);
    return res.json(song);
}));

router.get('/user/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    return res.json(user);
}));

const songValidations = [
    check('songName')
        .notEmpty()
        .withMessage('Song name must not be empty.'),
    check('songName')
        .isLength({ max: 50 })
        .withMessage('Song name cannot be longer than 50 characters.'),
    check('albumImage')
        .notEmpty()
        .withMessage('Album image url must not be empty.'),
    check('songLink')
        .exists()
        .withMessage('You have to upload an audio file!'),
    handleValidationErrors
];

router.post('/:id', requireAuth, songValidations, asyncHandler(async function (req, res) {

    const song = await Song.create(req.body);
    return res.json(song);
}));

router.delete('/:id', requireAuth, asyncHandler(async function (req, res) {
    const song = await Song.findByPk(req.params.id);
    if (!song) throw new Error('Cannot find song');
    await Song.destroy({ where: { id: song.id } });

    return res.json(song);

}));
const editSongValidations = [
    check('songName')
        .notEmpty()
        .withMessage('Song name must not be empty.'),
    check('songName')
        .isLength({ max: 50 })
        .withMessage('Song name cannot be longer than 50 characters.'),
    check('albumImage')
        .notEmpty()
        .withMessage('Album image url must not be empty.'),

    handleValidationErrors
];

router.put('/:id', requireAuth, editSongValidations, asyncHandler(async function (req, res) {
    const id = req.params.id;
    const originalSong = await Song.findByPk(id);
    if (!originalSong) throw new Error('Cannot find song');
    const { songName, songLink, userId, albumImage } = req.body;
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
