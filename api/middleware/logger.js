//contains auth middleware
const jwt = require("jsonwebtoken")
const secret = require('../../config/DEVkeys').secret

module.exports = {
    verifyToken: (req, res, next) => {
        jwt.verify(req.headers.authorization, secret, function (err, decoded) {
            if (err) console.log(err)
            if (decoded) {
                req.userType = decoded.userType;
                req.userId = decoded.userId;
                return next();
            } else {
                return res.status(401).send('Please log in first');
            }
        })
    }
}