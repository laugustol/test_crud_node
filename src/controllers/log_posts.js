const Log_posts = require("../models/log_posts");
const Users = require("../models/users");
const Posts = require("../models/posts");
const { message } = require("../utils/message");
module.exports = {
    getAll: async (req, res) => {
        try {
            const logs = await Log_posts.findAll({
                include: [
                    { model: Users, attributes: { exclude: ["password"] } },
                    { model: Posts }
                ]
            });

            return res.status(200).json(message(logs, "", false));
        } catch (e) {
            res.status(400).json(message({}, e, true));
        }
    }
};
