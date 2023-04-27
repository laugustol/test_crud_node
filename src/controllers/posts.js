const sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const Users = require("../models/users");
const Posts = require("../models/posts");
const Reviews = require("../models/reviews");
const Ratings = require("../models/ratings");
const Log_posts = require("../models/log_posts");
const { message } = require("../utils/message");
module.exports = {
    getAll: async (req, res) => {
        try {
            const query = {
                where: { status: 1 },
                attributes: [
                    "id",
                    "user_id",
                    "title",
                    "description",
                    [
                        sequelize.literal(
                            `CASE WHEN post.createdAt < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 'true' ELSE 'false' END`
                        ),
                        "alert"
                    ]
                ],
                include: [
                    { model: Users, attributes: { exclude: ["password"] } },
                    { model: Reviews, include: Users },
                    {
                        model: Ratings,
                        include: Users
                    }
                ],
                order: [["createdAt", "ASC"]]
            };
            if (req.query.startDate && req.query.endDate) {
                query.where.createdAt = {
                    [sequelize.Op.between]: [
                        req.query.startDate,
                        req.query.endDate
                    ]
                };
            }
            let posts = await Posts.findAll(query);
            posts = posts.map((post) => post.toJSON());
            posts.map((e) => {
                let sum = 0;
                e.ratings.map((a) => {
                    sum += a.rating;
                });
                e._rating = sum / e.ratings.length;
                return e;
            });
            res.status(200).json(message(posts, "", false));
        } catch (e) {
            res.status(400).json(message({}, e.parent.code, true));
        }
    },
    getOne: async (req, res) => {
        try {
            const query = {
                attributes: [
                    "id",
                    "user_id",
                    "title",
                    "description",
                    [
                        sequelize.literal(
                            `CASE WHEN post.createdAt < DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 'true' ELSE 'false' END`
                        ),
                        "alert"
                    ]
                ],
                where: { id: req.params.id },
                include: [
                    { model: Users, attributes: { exclude: ["password"] } },
                    { model: Reviews, include: Users },
                    {
                        model: Ratings,
                        include: Users
                    }
                ],
                order: [["createdAt", "ASC"]]
            };
            if (req.query.startDate && req.query.endDate) {
                query.where.createdAt = {
                    [sequelize.Op.between]: [
                        req.query.startDate,
                        req.query.endDate
                    ]
                };
            }

            let post = await Posts.findOne(query);

            post = post.toJSON();

            let sum = 0;
            post.ratings.map((a) => {
                sum += a.rating;
            });
            post._rating = sum / post.ratings.length;

            res.status(200).json(message(post, "", false));
        } catch (e) {
            res.status(400).json(message({}, e.parent.code, true));
        }
    },
    add: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await Posts.create(req.body);
            await Log_posts.create({
                user_id: req.body.user_id,
                action: "CREATE"
            });

            res.status(200).json(
                message({}, "El post a sido creado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, e.parent.code, true));
        }
    },
    update: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            Posts.update(
                {
                    title: req.body.title,
                    description: req.body.description
                },
                { where: { id: req.params.id } }
            );
            await Log_posts.create({
                post_id: req.params.id,
                user_id: req.body.user_id,
                action: "UPDATE"
            });

            res.status(200).json(
                message({}, "El post a sido modificado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, e.parent.code, true));
        }
    },
    delete: async (req, res) => {
        try {
            await Posts.update({ status: 0 }, { where: { id: req.params.id } });
            await Log_posts.create({
                post_id: req.params.id,
                request_action: "DELETE"
            });
            res.status(200).json(
                message({}, "El post a sido eliminado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, error.parent.code, true));
        }
    }
};
