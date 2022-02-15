const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs')
const commentsRouter = require('./comments.js')
const currentRouter = require('./current.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter)

router.use('/comments', commentsRouter)

router.use('/current', currentRouter)


module.exports = router;
