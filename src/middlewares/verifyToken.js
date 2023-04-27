const jwt = require("jsonwebtoken");
function verifyTokenAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "secretamsodaomd", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            if (user.permission == "ADMIN") {
                req.user = user;

                next();
            } else {
                return res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
}
function verifyTokenSupervisor(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "secretamsodaomd", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            if (user.permission == "SUPERVISOR") {
                req.user = user;

                next();
            } else {
                return res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { verifyTokenAdmin, verifyTokenSupervisor };
