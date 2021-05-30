var express = require("express");
var router = express.Router();
const Viaje = require("../controller/viaje");
const verify = require("../controller/verifyToken");

//router.get("/listar")
//router.get("/buscar")
router.post("/alta", Viaje.create);
//router.put("/modificar")
//router.delete("/baja")
//router.put("/asignar_vehiculo", Viaje.asignDriverWithVehicule);
//router.put("/eliminar_vehiculo", Viaje.removeDriverWithVehicule);

module.exports = router;
