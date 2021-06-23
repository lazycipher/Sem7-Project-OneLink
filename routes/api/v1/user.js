const { Router } = require("express");
const auth = require("../../../middlewares/auth");
const userControllers = require("../../../controllers/user");
const router = Router();

/**
 * @route   POST api/v1/user/addLink
 * @desc    Add a new link
 * @access  Private
 */

router.post("/addLink", auth, userControllers.addLink);

/**
 * @route   DELETE api/v1/user/deleteLink
 * @desc    delete existing link
 * @access  Private
 */

router.post("/deleteLink", auth, userControllers.deleteLink);

/**
 * @route   POST api/user/pushHits
 * @desc    Push browsing user for details
 * @access  PUBLIC
 */
router.post("/pushHits", userControllers.pushHits);

/**
 * @route   GET api/user/stats
 * @desc    Get Stats for users dashboard
 * @access  Private
 */
router.get("/stats", auth, userControllers.getStats);

/**
 * @route   GET api/user/:username
 * @desc    Get user public profile
 * @access  PUBLIC
 */
router.get("/:username", userControllers.getProfile);

module.exports = router;
