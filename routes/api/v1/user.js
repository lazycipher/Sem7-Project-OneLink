const {
    Router
} = require('express');
const auth = require('../../../middlewares/auth');
const userControllers = require('../../../controllers/user');
const router = Router();

/**
 * @route   POST api/v1/user/addLink
 * @desc    Add a new link
 * @access  Private
 */

router.post('/addLink', auth, userControllers.addLink);

/**
 * @route   DELETE api/v1/user/deleteLink
 * @desc    delete existing link
 * @access  Private
 */


router.post('/deleteLink', auth, userControllers.deleteLink);

/**
 * @route   GET api/user/:username
 * @desc    Get user public profile
 * @access  PUBLIC
 */
router.get('/:username', userControllers.getProfile);

/**
 * @route   POST api/user/pushHits
 * @desc    Push browsing user for details
 * @access  PUBLIC
 */
router.post('/pushHits', userControllers.pushHits);

module.exports = router;
