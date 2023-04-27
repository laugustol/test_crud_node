const { validationResult } = require("express-validator");
const Reviews = require("../models/reviews");
const { message } = require("../utils/message");
module.exports = {
    add: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await Reviews.create(req.body);

            res.status(200).json(
                message({}, "El review a sido creado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, e, true));
        }
    },
    update: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            Reviews.update(
                {
                    comment: req.body.comment
                },
                {
                    where: {
                        id: req.params.id,
                        post_id: req.body.post_id
                    }
                }
            );

            res.status(200).json(
                message({}, "El review a sido modificado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, e, true));
        }
    },
    delete: async (req, res) => {
        try {
            Reviews.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(
                message({}, "El review a sido eliminado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, e, true));
        }
    }
};
