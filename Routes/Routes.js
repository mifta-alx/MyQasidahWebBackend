const express = require("express");
const { getQasidah, getQasidahById, saveQasidah, updateQasidah, deleteQasidah } = require("../Controller/QasidahController.js");
const { login, signUp, getSingleUsers, logout } = require("../Controller/AuthController.js");
const {refreshToken} = require('../Controller/refreshToken.js')
const {getKitab, getKitabById, saveKitab, updateKitab, deleteKitab} = require('../Controller/KitabController.js')
const { validationSignUp, runValidation, validateQasidah, validateLogin, validateKitab} = require('../validation')
const middleware = require('../middleware')
const router = express.Router();

//users 
router.post("/signup",validationSignUp, runValidation, signUp);
router.post("/login", validateLogin, runValidation, login);
router.get("/user", middleware, getSingleUsers);
router.get("/refresh", refreshToken );
router.delete("/logout", logout);
//

//qasidah data
router.get("/qasidahs", getQasidah);
router.get("/qasidahs/:id", getQasidahById);
router.post("/qasidahs/", validateQasidah, runValidation, saveQasidah);
router.put("/qasidahs/:id", validateQasidah, runValidation, updateQasidah);
router.delete("/qasidahs/:id", deleteQasidah);
//

//kitab
router.get("/kitab", getKitab);
router.get("/kitab/:id", getKitabById);
router.post("/kitab/", validateKitab, runValidation, saveKitab);
router.put("/kitab/:id", validateKitab, runValidation, updateKitab);
router.delete("/kitab/:id", deleteKitab);
//

module.exports = router
