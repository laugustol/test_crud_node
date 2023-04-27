const { validationResult } = require("express-validator");
const Ratings = require("../models/ratings");
const { message } = require("../utils/message");
module.exports = {
    add: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await Ratings.create(req.body);

            return res
                .status(200)
                .json(
                    message({}, "El rating a sido creado exitosamente", false)
                );
        } catch (e) {
            res.status(400).json(message({}, e, true));
        }
    },
    delete: async (req, res) => {
        try {
            Ratings.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(
                message({}, "El rating a sido eliminado exitosamente", false)
            );
        } catch (e) {
            res.status(400).json(message({}, e, true));
        }
    }
};
