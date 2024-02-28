const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            res.status(403).json("You're not permitted to access this")
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.roleID == 1) {
                next();
            } else {
                res.status(403).json("You're not allow to delete");
            }
        });
    }
}

module.exports = middlewareController;