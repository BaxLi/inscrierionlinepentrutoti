const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

// - (from app comes->)/api/auth + (inside auth.routes we parse this one ->) /register
router.post(
  '/register',
  [
    check('email', 'invalid email').isEmail(),
    check('password', 'invalid password (min 3 symbols)').isLength({ min: 3 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'REGISTRATION validation failed'
      })
    }
    try {
      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'user already exists' })
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email: email, password: hashedPassword })
      await user.save()
      res.status(201).json({ message: 'user created successfully' })
    } catch (error) {
      console.log('auth.routes->error', error)
      res.status(500).json({ message: 'somethig wron on server side ' })
    }
  }
)

router.post(
  '/login',
  [check('email', 'invalid email').normalizeEmail().isEmail(), check('password', 'invalid password ').exists()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'LOGIN validation failed'
      })
    }

    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'can-t find user' })
      }
      const isMatch = bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'wrong password' })
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expireIn: '1h' })
      res.json({ token, userId: user.id })
    } catch (error) {
      console.log('auth.routes->error', error)
      res.status(500).json({ message: 'somethig wron on server side on LOGIN' })
    }
  }
)

module.exports = router
