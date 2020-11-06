const jwt = require('jsonwebtoken');
var config = require('./auth.config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            console.log('Errrr0');
            return res.status(403).send({ message: "No token provided!" });
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log('Errrr2');
                return res.status(401).send({ message: "Unauthorized!" });
            }
            
           // req.userId = decoded.id;
            req.username = decoded.username;
            next();
        });

    } catch (error) {
        console.log('Errrr3');
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
