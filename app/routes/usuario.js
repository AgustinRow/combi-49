var express = require("express");
var router = express.Router();
const Usuario = require("../controller/usuario");
const verify = require("../controller/verifyToken");
<<<<<<< HEAD

router.get("/lista_chofer/(:id)", verify, Usuario.getAllDrivers);
router.post("/alta_chofer", verify, Usuario.addUser);
router.post("/registrar", Usuario.register);
router.put("/modificar_chofer", verify, Usuario.updateDriver);
router.get("/login", Usuario.login);
=======
const auth = require("../controller/auth");

router.get("/lista_chofer", verify, Usuario.getAllDrivers);
router.post("/alta_chofer", verify, Usuario.register);
router.post("/registrar", Usuario.register);
router.put("/modificar_chofer", verify, Usuario.updateDriver);
router.post("/login", Usuario.login);
>>>>>>> 78cb406e10a5a5a90b148467b854788976e90ea8
router.get("/buscar", verify, Usuario.findUser);

module.exports = router;
