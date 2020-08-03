const express = require('express')

const router = express()

router.use('/v1', require('./v1/index'))

router.get('/', async (req, res) => {
    try {
        res.json({ message: 'API is running' })
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, let\'s try again' })
    }
})

module.exports = router