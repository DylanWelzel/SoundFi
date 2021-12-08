const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { updateSong } = require('../../../frontend/src/store/song');
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
    console.log(req.params, 'router.delete req.params.id')
    const song = await Song.findByPk(req.params.id)
    if (!song) throw new Error('Cannot find song');
    await Song.destroy({ where: { id: song.id } });

    return res.json(song)

}));

router.put('/:id', requireAuth, asyncHandler(async function (req, res) {
    const song = await Song.findByPk(req.params.id)
    if (!song) throw new Error('Cannot find song');
    const updatedSong = await Song.update(req.body)
    console.log(updateSong, 'updated songggg')
    return res.json(updatedSong);

}));




module.exports = router;
