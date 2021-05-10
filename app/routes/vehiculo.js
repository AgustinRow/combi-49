var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

router.post("/alta", Vehiculo.addVehicle);
router.get("/listar", Vehiculo.listVehicle);
router.get("/", Vehiculo.findOneVehicle);
router.put("/modificar", Vehiculo.updateVehicle);

module.exports = router;
