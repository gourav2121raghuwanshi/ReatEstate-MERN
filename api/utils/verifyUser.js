const { errorHandler } = require("./error.js");
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    // const token = req.cookies.access_token ;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // "Bearer <token>"
    
    // console.log("token uri user"+token);
    if (!token) {
        console.log("no token given")
        return next(errorHandler(401, "Unauthorized: Token is empty or incorrect"));
    }
   

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, `Forbidden: ${err}`));

        req.user = user;
        next();
    });
};


