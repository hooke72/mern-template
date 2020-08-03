const {Router} = require('express')
const User = require('../../models/User')
const auth = require('../../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again' })
    }
})
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again' })
    }
})

module.exports = router