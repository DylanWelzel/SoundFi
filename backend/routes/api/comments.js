const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Comment, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/:songId', asyncHandler(async (req, res) => {
    const songId = req.params.songId
    const comments = await Comment.findAll({
        include: {
            model: User,
        },
        where: { songId },
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    res.json(comments);
}));

router.get('/users/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const user = await User.findByPk(userId)
    return res.json(user)
}));

const commentValidations = [
    check('content')
        .notEmpty()
        .withMessage('Need content'),
    check('content')
        .isLength({ max: 500 })
        .withMessage('Comment cannot be longer than 500 characters.'),
    handleValidationErrors
]

router.post('/:songId', requireAuth, commentValidations, asyncHandler(async function (req, res) {
    const comment = await Comment.create(req.body);
    return res.json(comment);
}));

router.delete('/:id/delete', requireAuth, asyncHandler(async function (req, res) {
    const comment = await Comment.findByPk(req.params.id)
    if (!comment) throw new Error('Cannot find comment');
    await Comment.destroy({ where: { id: comment.id } });

    return res.json(comment)

}));


router.put('/:id/edit', requireAuth, commentValidations, asyncHandler(async function (req, res) {
    const id = req.params.id
    const originalComment = await Comment.findOne({
        include: {
            model: User,
        },
        where: { id },
    })
    if (!originalComment) throw new Error('Cannot find comment');
    const { content } = req.body
    const updatedComment = await originalComment.update(
        {
            content
        }
    )
    return res.json(updatedComment);
}));




module.exports = router;
