const User = require('../models/User');
const regex = require('../utils/Regex');

module.exports = {
    addLink: async (req, res) => {
        const {
            points
        } = req.body;
        try {
            for (const point of points) {
                let match = regex.isValidURL(point.href)
                if (!match) {
                    throw new Error("Please enter valid URL with http:// or https://");
                }
            }
            if (points.length <= 0) {
                return res.status(400).json({
                    msg: 'Oops! Looks like you forgot something!'
                });
            }
            let user = await User.findOneAndUpdate({
                username: req.user.username
            }, {
                $push: {
                    social: points
                }
            });
            if (!user) throw Error('User Does not exist');

            return res.status(200).json(points);
        } catch (e) {
            return res.status(400).json({
                msg: e.message
            });
        }
    },
    deleteLink: async (req, res) => {
        const {
            social
        } = req.body;
        if (!social) {
            return res.status(400).json({
                msg: 'Something wrong with recevied name'
            });
        }
        try {
            const user = await User.findOneAndUpdate({
                username: req.user.username
            }, {
                $pull: {
                    social: social
                }
            });
            if (!user) throw Error('Something went wrong!');

            res.status(201).json(social);
        } catch (e) {
            res.status(400).json({
                msg: e.message
            });
        }
    },
    getProfile: async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.params.username
            }).select('-password');
            if (!user) return res.status(404).json({
                msg: "User not found!"
            })
            res.json(user.social);
        } catch (e) {
            res.status(400).json({
                msg: e.message
            });
        }
    }
}
