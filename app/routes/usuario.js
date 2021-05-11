var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");
const verify = require("../controller/verifyToken");
const auth = require("../controller/auth");

router.get("/lista_chofer", Usuario.getAllDrivers);
router.post("/alta_chofer", Usuario.register);
router.post("/registrar", Usuario.register);
router.put("/modificar_chofer", Usuario.updateDriver);
router.post("/login", Usuario.login);
router.get("/buscar", Usuario.findUser);

module.exports = router;
