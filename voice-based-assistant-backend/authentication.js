let jwt = require('jsonwebtoken')
let accessTokenSecret = '123123abcabc'

module.exports = {
    
    generateToken : (email_address) => {
        return jwt.sign({ email_address: email_address }, accessTokenSecret, {expiresIn: '20m'});
    },

    authenticateJWT : (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, accessTokenSecret, (err, authenticated_user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.authenticated_user = authenticated_user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}