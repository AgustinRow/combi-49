var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");

/* GET users listing. */
router.get("/", Usuario.getAllUsers);
router.post("/", Usuario.addUser);

module.exports = router;
