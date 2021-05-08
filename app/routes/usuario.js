var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");

/*  */
router.get("/", Usuario.getAllUsers);
router.post("/", Usuario.addUser);
router.post("/login", Usuario.findUserForLogIn);
router.get("/buscar", Usuario.findUser);
//router.get("/lista_chofer/(:id)", verify, Usuario.getAllDrivers);
//router.post("/alta_chofer", verify, Usuario.register);
//router.post("/registrar", Usuario.register);
//router.put("/modificar_chofer", verify, Usuario.updateDriver);
//router.get("/login", Usuario.login);
//router.get("/buscar", verify, Usuario.findUser);

module.exports = router;
