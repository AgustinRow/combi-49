var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

router.post("/alta", Vehiculo.addVehicle);
router.get("/listar", Vehiculo.listVehicle);
router.get("/buscar/(:id)", Vehiculo.findOneVehicle);
router.put("/modificar", Vehiculo.updateVehicle);
//TODO
router.delete("/borrar/(:id)", Vehiculo.remove);
module.exports = router;
