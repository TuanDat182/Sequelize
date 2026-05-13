const jwt = require("jsonwebtoken");
const createError = require("http-errors");
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) throw createError.Unauthorized("token not found");

        const token = authHeader && authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();
    }
    catch (err) {
        next(err);
    }
}

module.exports = authMiddleware;