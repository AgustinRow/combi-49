var express = require("express");
var router = express.Router();
const Viaje = require("../controller/viaje");
const verify = require("../controller/verifyToken");

router.get("/listar", Viaje.list);
router.get("/buscar", Viaje.find);
router.get("/buscar/(:id)", Viaje.findOne);
router.post("/alta", Viaje.create);
router.put("/modificar", Viaje.update);
router.get("/choferes_viajes_libres", Viaje.driverAndTravel);
router.delete("/baja/(:id)", Viaje.remove); //no esta implementado
router.get("/iniciar/(:id)", Viaje.start);
router.get("/finalizar/(:id)", Viaje.finish);
router.get("/comenzar/(:id)", Viaje.initTravel);

module.exports = router;
