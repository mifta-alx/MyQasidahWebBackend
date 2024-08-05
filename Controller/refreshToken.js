const User = require("../Model/UsersModel.js");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.refreshToken = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.refresh_token) return res.sendStatus(401)
    const refreshToken = req.cookies.refresh_token ;
    const user = await User.findOne({
      $or: [{ refresh_token: refreshToken }],
    });
    if (!user) {
      return res.sendStatus(403);
    }
    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      (err, decoded) => {
        if (err || user.username !== decoded.username ) return res.status(403).json({ message: "Token tidak valid" });
        const accessToken = jsonwebtoken.sign(
          {"username" : user.username}, 
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: "30s" }
        );
        return res.json({ accessToken });
      }
    );
};
