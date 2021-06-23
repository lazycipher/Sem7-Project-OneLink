const User = require("../models/User");
const Activity = require("../models/Activity");
const regex = require("../utils/Regex");

module.exports = {
  addLink: async (req, res) => {
    const { points } = req.body;
    try {
      for (const point of points) {
        let match = regex.isValidURL(point.href);
        if (!match || point.href.slice(0, 4) !== "http") {
          throw new Error("Please enter valid URL with http:// or https://");
        }
      }
      if (points.length <= 0) {
        return res.status(400).json({
          msg: "Oops! Looks like you forgot something!",
        });
      }
      let user = await User.findOneAndUpdate(
        {
          username: req.user.username,
        },
        {
          $push: {
            social: points,
          },
        }
      );
      if (!user) throw Error("User Does not exist");

      return res.status(200).json(points);
    } catch (e) {
      return res.status(400).json({
        msg: e.message,
      });
    }
  },
  deleteLink: async (req, res) => {
    const { social } = req.body;
    if (!social) {
      return res.status(400).json({
        msg: "Something wrong with recevied name",
      });
    }
    try {
      const user = await User.findOneAndUpdate(
        {
          username: req.user.username,
        },
        {
          $pull: {
            social: social,
          },
        }
      );
      if (!user) throw Error("Something went wrong!");

      res.status(201).json(social);
    } catch (e) {
      res.status(400).json({
        msg: e.message,
      });
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.params.username,
      }).select("-password");
      console.log("user:", user);
      if (!user)
        return res.status(404).json({
          msg: "User not found!",
        });
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({
        msg: e.message,
      });
    }
  },
  pushHits: async (req, res) => {
    try {
      const { username, name, href, IP } = req.body;
      let visitorData = IP;
      const user = await User.findOne({ username: username });
      let index;
      let count;
      let x = 0;
      for (i of user.social) {
        if (i.name === name && i.href === href) {
          index = x;
          count = i.count;
          break;
        }
        x++;
      }
      const updateUser = await User.findOneAndUpdate(
        { username: username },
        { $set: { [`social.${index}.count`]: count + 1 } }
      ).select("-password");
      if (!updateUser) throw new Error("Internal Server Error!");

      const newActivity = new Activity({
        username,
        name,
        href,
        IP: visitorData,
      });
      const saveActivity = await newActivity.save();
      if (!saveActivity) throw new Error("Internal Server Error!");

      const nUser = await User.findOne({ username });

      res.status(201).json({ updatedUser: nUser });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        msg: e.message,
      });
    }
  },
  getStats: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user)
        return res.status(401).json({
          msg: "Token is not valid",
        });

      const activities = await Activity.find({ username: user.username });

      const dailyHits = {};
      for (activity of activities) {
        if (dailyHits[activity.activityDate]) {
          dailyHits[activity.activityDate] += 1;
        } else {
          dailyHits[activity.activityDate] = 1;
        }
      }

      const dailyHitsData = Object.keys(dailyHits).map((key) => {
        return {
          date: new Date(key).toLocaleDateString(),
          count: dailyHits[key],
        };
      });

      const linkAnalytics = {};
      for (activity of activities) {
        if (linkAnalytics[activity.name]) {
          linkAnalytics[activity.name] += 1;
        } else {
          linkAnalytics[activity.name] = 1;
        }
      }
      const linkAnalyticsData = Object.keys(linkAnalytics).map((key) => {
        return {
          name: key,
          count: linkAnalytics[key],
        };
      });

      const countryWiseHits = {};
      for (activity of activities) {
        if (countryWiseHits[activity.IP.country]) {
          countryWiseHits[activity.IP.country] += 1;
        } else {
          countryWiseHits[activity.IP.country] = 1;
        }
      }
      const countryWiseHitsData = Object.keys(countryWiseHits).map((key) => {
        return {
          country: key,
          count: countryWiseHits[key],
        };
      });

      const regionWiseHits = {};
      for (activity of activities) {
        if (regionWiseHits[activity.IP.regionName]) {
          regionWiseHits[activity.IP.regionName] += 1;
        } else {
          regionWiseHits[activity.IP.regionName] = 1;
        }
      }
      const regionWiseHitsData = Object.keys(regionWiseHits).map((key) => {
        return {
          region: key,
          count: regionWiseHits[key],
        };
      });

      res.status(200).json({
        dailyHits: dailyHitsData,
        linkAnalytics: linkAnalyticsData,
        countryWiseHits: countryWiseHitsData,
        regionWiseHits: regionWiseHitsData,
        activities: activities,
      });
    } catch (e) {
      res.status(400).json({
        msg: e.message,
      });
    }
  },
};
