const jwt = require('jsonwebtoken');


const Token = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        res.status(404).json({ message: "User not authenticated!"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(404).json({ message: "Invalid Token"})
        };
        req.user = user;
        next();
    });
};

module.exports = {Token};