const { body, validationResult, check } = require("express-validator");
const User = require("../Model/UsersModel.js");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map((x) => x.msg),
      param : errors.array().map((x) => x.param)
    });
  }
  next();
};

exports.validateQasidah = [
  check("title", "Judul qasidah tidak boleh kosong!").notEmpty(),
  check("title_arabic", "Judul arab qasidah tidak boleh kosong!").notEmpty(),
  check("version", "Versi qasidah tidak boleh kosong!").notEmpty(),
];

exports.validationSignUp = [
  body("username").custom(async (value) => {    
    const duplicateName = await User.findOne({ username: value });
    if (duplicateName) {
      throw new Error("Oops, Username sudah terdaftar!");
    }
    return true;
  }),
  body("email").custom(async (value) => {
    const duplicateEmail = await User.findOne({ email: value });
    if (duplicateEmail) {
      throw new Error("Oops, Email sudah terdaftar!");
    }
    return true;
  }),
  check("username", "Username tidak boleh kosong!").notEmpty().isLength({ min: 6 })
  .withMessage("Username minimal 6 karakter"),
  check("email", "Email tidak boleh kosong!").notEmpty().isEmail().withMessage("Email tidak valid!"),
  check("password", "Password tidak boleh kosong!")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];

exports.validateLogin = [
    check("username", "Username tidak boleh kosong!").notEmpty().isLength({ min: 6 }).withMessage("Username minimal 6 karakter"),
    check("password", "Password tidak boleh kosong!").notEmpty().isLength({ min: 8 }).withMessage("Password minimal 8 karakter"),
]

exports.validateKitab = [
  check("title", "Nama kitab tidak boleh kosong!").notEmpty(),
  check("title_arabic", "Nama kitab arab tidak boleh kosong!").notEmpty(),
  check("pengarang", "Nama pengaang tidak boleh kosong!").notEmpty(),
];