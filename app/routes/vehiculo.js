var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

<<<<<<< HEAD
router.post("/alta_vehiculo", verify, Vehiculo.addVehicle);
=======
router.post("/alta", verify, Vehiculo.addVehicle);
router.get("/listar", verify, Vehiculo.listVehicle);
router.get("/", verify, Vehiculo.findOneVehicle);
router.put("/modificar", verify, Vehiculo.updateVehicle);
>>>>>>> 78cb406e10a5a5a90b148467b854788976e90ea8

module.exports = router;
