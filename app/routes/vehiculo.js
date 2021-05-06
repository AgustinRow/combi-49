var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

router.post("/alta_vehiculo", verify, Vehiculo.addVehicle);

module.exports = router;
