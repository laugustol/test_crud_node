const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { message } = require("../utils/message");
module.exports = {
    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await Users.findOne({
                where: { email: req.body.email }
            });
            if (user) {
                const isValid = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (isValid) {
                    user = user.toJSON();
                    const token = jwt.sign({ ...user }, "secretamsodaomd");
                    user.token = token;
                    delete user.password;
                    return res
                        .status(200)
                        .json(message(user, "Inicio de sesion exitoso", false));
                } else {
                    return res
                        .status(400)
                        .json(
                            message({}, "Usuario o contraseña incorrecto", true)
                        );
                }
            } else {
                return res
                    .status(400)
                    .json(message({}, "Usuario o contraseña incorrecto", true));
            }
        } catch (e) {
            return res.status(400).json(message({}, e, true));
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await Users.findAll({
                attributes: { exclude: ["password"] }
            });

            return res.status(200).json(users);
        } catch (e) {
            return res.status(400).json(message({}, e, true));
        }
    },
    add: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await Users.findOne({
                where: { email: req.body.email }
            });
            if (user) {
                return res
                    .status(400)
                    .json(message({}, "El usuario ya existe", true));
            } else {
                const salt = await bcrypt.genSalt(5);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                await Users.create(req.body);
                return res
                    .status(200)
                    .json(
                        message(
                            {},
                            "El usuario a sido creado exitosamente",
                            false
                        )
                    );
            }
        } catch (e) {
            return res.status(400).json(message({}, e, true));
        }
    },
    update: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const salt = await bcrypt.genSalt(5);
            const hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
            Users.update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    permissions: req.body.permission
                },
                { where: { id: req.params.id } }
            );

            return res
                .status(200)
                .json(
                    message(
                        {},
                        "El usuario a sido modificado exitosamente",
                        false
                    )
                );
        } catch (e) {
            return res.status(400).json(message({}, e, true));
        }
    },
    delete: async (req, res) => {
        try {
            Users.destroy({ where: { id: req.params.id } });
            return res
                .status(200)
                .json(
                    message(
                        {},
                        "El usuario a sido eliminado exitosamente",
                        false
                    )
                );
        } catch (e) {
            return res.status(400).json(message({}, e, true));
        }
    }
};
