let jwt = require('jsonwebtoken')
let accessTokenSecret = '123123abcabc'
module.exports = {
    
    generateToken : (email_address) => {
        return jwt.sign({ email_address: email_address }, accessTokenSecret);
    },

    authenticateJWT : (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
    
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}