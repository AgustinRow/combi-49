var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");
const verify = require("../controller/verifyToken");
const auth = require("../controller/auth");
const recovery = require("../controller/recovery");

router.post("/recuperar_password", recovery.sendEmail);

//rutas pasajeros
router.get("/perfil/(:id)", Usuario.profile);
router.put("/cerrar_cuenta/(:id)", Usuario.closeAccount);

//rutas acceso admi/chofer/pasajero
router.put("/modificar_usuario", Usuario.update);
router.post("/registrar", Usuario.register);
router.post("/login", Usuario.login);
//router.put("/recuperar_passowrd", Usuario.recoverPassword);

//ruta admin
router.get("/lista_pasajeros", Usuario.listPassengers);
router.get("/lista_choferes", Usuario.getAllDrivers);
router.post("/alta_chofer", Usuario.register);
router.delete("/borrar/(:id)", Usuario.remove);
router.get("/buscar/(:id)", Usuario.findUser);
router.get("/lista_choferes_disponibles", Usuario.listAvailableDriver);

//TODO:

module.exports = router;
