var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

router.post("/alta", verify, Vehiculo.addVehicle);
router.get("/listar", verify, Vehiculo.listVehicle);
router.get("/", verify, Vehiculo.findOneVehicle);
router.put("/modificar", verify, Vehiculo.updateVehicle);

module.exports = router;
