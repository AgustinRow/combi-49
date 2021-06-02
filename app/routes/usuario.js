var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");
const verify = require("../controller/verifyToken");
const auth = require("../controller/auth");

router.get("/lista_choferes", Usuario.getAllDrivers);
router.get("/lista_pasajeros", Usuario.listPassengers)

router.post("/alta_chofer", Usuario.register);
router.post("/registrar", Usuario.register);
router.put("/modificar_usuario", Usuario.update);
router.post("/login", Usuario.login);
router.get("/buscar/(:id)", Usuario.findUser);
//TODO:
router.delete("/borrar/(:id)", Usuario.remove);

module.exports = router;
