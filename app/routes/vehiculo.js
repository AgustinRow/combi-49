var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

router.post("/alta", Vehiculo.add);
router.get("/listar", Vehiculo.list);
router.get("/listar_disponibles", Vehiculo.listAvailableVehicle);

router.get("/buscar/(:id)", Vehiculo.findOneVehicle);
router.put("/modificar", Vehiculo.updateVehicle);
//TODO
router.delete("/borrar/(:id)", Vehiculo.remove);
module.exports = router;
