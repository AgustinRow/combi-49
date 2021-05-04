var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");

/*  */
router.get("/", Usuario.getAllUsers);
router.post("/", Usuario.addUser);
router.get("/login", Usuario.findUserForLogIn);
router.get("/buscar", Usuario.findUser);

module.exports = router;
