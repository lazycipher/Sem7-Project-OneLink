const {
  Router
} = require('express');
const auth = require('../../../middlewares/auth');
const authControllers = require('../../../controllers/auth');
const router = Router();

/**
 * @route   POST api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', authControllers.login);

/**
 * @route   POST api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', authControllers.register);

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, authControllers.getUser);

/**
 * @route   GET api/auth/user
 * @desc    Check username
 * @access  Public
 */

router.get('/username/available', authControllers.usernameCheck);


module.exports = router;
