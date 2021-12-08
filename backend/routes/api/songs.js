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

router.post('/:id', requireAuth, songValidations.validateCreate, asyncHandler(async (req, res) => {
    const song = await Song.create(req.body);
    return res.json(song);
}));

router.delete('/:id', requireAuth, asyncHandler(async function (req, res) {
    const song = await Song.findByPk(req.params.id)
    if (!song) throw new Error('Cannot find song');
    await Song.destroy({ where: { id: song.id } });

    return res.json(song)

}));

router.put('/:id', requireAuth, asyncHandler(async function (req, res) {
    const id = req.params.id
    const originalSong = await Song.findByPk(id)
    if (!originalSong) throw new Error('Cannot find song');
    const { songName, songLink, userId } = req.body
    const updatedSong = await originalSong.update(
        {
            id,
            songName,
            songLink,
            userId
        }
    )
    console.log(updatedSong, 'updated songggg')
    return res.json(updatedSong);
}));




module.exports = router;
