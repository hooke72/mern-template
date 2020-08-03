const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password length is less then '+ config.get('minPasswordLength'))
            .isLength({ min: config.get('minPasswordLength') })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data\'s registration'
                })
            }

            const {email, password} = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'User already registered' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })
            await user.save()
            res.status(201).json({ message: 'User is created' })
        } catch (e) {
            res.status(500).json({ message: 'Something wrong, let\'s try again' })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Needs a correct email').normalizeEmail().isEmail(),
        check('password', 'Enter a password').exists()
    ],
    async (req, res) => {
        console.log(req.body)
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data\'s for entering'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password, try again' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: config.get('jwtExpiresIn')}
            )
            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Something wrong, let\'s try again' })
        }
    })

module.exports = router