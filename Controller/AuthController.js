const User = require("../Model/UsersModel.js");
const dotenv = require("dotenv");
const hash = require("object-hash");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

exports.signUp = async (req, res) => {
  const { username, email, password, role, refresh_token } = new User(req.body);
  const pass_encrypt = hash.MD5(
    process.env.PASSWORD_SALT + password + process.env.PASSWORD_SALT
  );
  const users = new User({
    username,
    email,
    password: pass_encrypt,
    role,
    refresh_token
  });
  try {
    await users.save();
    return res.status(201).json({ message: "User berhasil disimpan!" });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    const pass_encrypt = hash.MD5(
      process.env.PASSWORD_SALT + password + process.env.PASSWORD_SALT
    );
    //cek apakah user terdaftar
    if (user) {
      //cek password
      if (pass_encrypt == user.password) {

        const accessToken = await jsonwebtoken.sign(
          {"username" : user.username},
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: "30s" }
        );

        const refreshToken = await jsonwebtoken.sign(
          {"username" : user.username}, 
          process.env.REFRESH_TOKEN_PRIVATE_KEY,
          { expiresIn: "1d" }
        );

        await User.updateOne(
          { username: user.username },
          { $set: { refresh_token: refreshToken } }
        );

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        
        res.clearCookie('jwt')
        return res
          .status(200)
          .json({ accessToken });
      } else {
        return res.status(404).json({
          message: "Password yang anda masukkkan salah!",
          param: "password",
        });
      }
    } else {
      return res.status(404).json({
        message: "Username atau email tidak ditemukan!",
        param: "username",
      });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.getSingleUsers = async (req, res) => {
  const data = await User.findOne({ username: req.username });
  return res
    .status(200)
    .json({ message: "berhasil", username: data.username, role: data.role });
};

exports.logout = async (req, res) => {
  const cookies = req.cookies
    if(!cookies?.refresh_token) return res.sendStatus(204) //no content
    const refreshToken = req.cookies.refresh_token ; 
  if (!refreshToken) {
    res.sendStatus(401);
  }
  const user = await User.findOne({
    $or: [{ refresh_token: refreshToken }],
  });
  if (!user) {
    res.clearCookie('refresh_token', {httpOnly : true });
    return res.sendStatus(204);
  }
  await User.updateOne({ refresh_token: user.refresh_token }, { $set: { refresh_token: null } });
  res.clearCookie('refresh_token', {httpOnly : true });
  return res.status(200).json({ message: "Logout Berhasil!" });
};
