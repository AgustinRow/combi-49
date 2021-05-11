var express = require("express");
var router = express.Router();
const Vehiculo = require("../controller/vehiculo");
const verify = require("../controller/verifyToken");

<<<<<<< HEAD
<<<<<<< HEAD
router.post("/alta_vehiculo", verify, Vehiculo.addVehicle);
=======
router.post("/alta", verify, Vehiculo.addVehicle);
router.get("/listar", verify, Vehiculo.listVehicle);
router.get("/", verify, Vehiculo.findOneVehicle);
router.put("/modificar", verify, Vehiculo.updateVehicle);
>>>>>>> 78cb406e10a5a5a90b148467b854788976e90ea8
=======
router.post("/alta", Vehiculo.addVehicle);
router.get("/listar", Vehiculo.listVehicle);
router.get("/", Vehiculo.findOneVehicle);
router.put("/modificar", Vehiculo.updateVehicle);
>>>>>>> 9735a9fdbbf3c9359779cfe392679a93ca5b5ca8

module.exports = router;
