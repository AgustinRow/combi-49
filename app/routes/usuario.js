var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");
const verify = require("../controller/verifyToken");
const auth = require("../controller/auth");

router.get("/lista_choferes", Usuario.getAllDrivers);
router.post("/alta_chofer", Usuario.register);
router.post("/registrar", Usuario.register);
router.put("/modificar_usuario/(:id)", Usuario.updateDriver);
router.post("/login", Usuario.login);
router.get("/buscar/(:id)", Usuario.findUser);
router.delete("/borrar/(:id)", Usuario.remove);

module.exports = router;
