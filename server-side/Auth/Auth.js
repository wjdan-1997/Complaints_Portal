
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1] // 'barrer' 'token'

    // console.log("Is Auth : ", token);
    
    if (token) {

        jwt.verify(token, process.env.JWT, (err, decode) => {
            if (err) { return res.json({ isLoggedIn: false , errorMessage: 'failed to Authticate' })}
            req.user = {};

            req.user.id = decode.id
            req.user.email = decode.email
            req.user.username = decode.name,
            req.user.role = decode.role,
            next();
        })
    }
    else {
        res.json({errorMessage: "Incorect Token ", isLoggedIn: false})
    }
}
module.exports = auth;