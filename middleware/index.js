require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

module.exports = async(req,res,next) => {
    const token = req.header("Authorization")
    if(!token) {
        return res.status(401).json({
            message : "Token tidak ditemukan!"
        })
    }
    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, decode) => {
        if(err) return res.status(403).json({message : "Token tidak valid"});
        req.username = decode.username
        next()
    })
}