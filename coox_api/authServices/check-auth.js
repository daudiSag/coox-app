const jwt = require('jsonwebtoken');
var secret = process.env.SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            // console.log('Errrr0');
            return res.status(403).send({ message: "No token provided!" });
        } else {

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    // console.log('Errrr2');
                    return res.status(401).send({ message: "Unauthorized!" });
                } else {

                    req.username = decoded.username;
                    next();

                }
                
            // req.userId = decoded.id;
              
            });
        }

    } catch (error) {
        // console.log('Errrr3');
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
