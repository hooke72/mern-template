const express = require('express')

const router = express()

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/users', require('./users.routes'))

router.get('/', async (req, res) => {
    try {
        res.json({ message: 'API V1 is running' })
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again' })
    }
})

module.exports = router