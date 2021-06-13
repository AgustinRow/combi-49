var express = require("express");
var router = express.Router();
const Pasaje = require("../controller/pasaje");
const Estado = require("../controller/estado");
const verify = require("../controller/verifyPayment");

//inicializa los estados de los pasajes,
//ejecutar esta api antes de comprar pasajes
router.get("/inicializar_estado", Estado.create);

router.post("/comprar", Pasaje.create);
router.get("/buscar/pasajero", Pasaje.findTravelsForUser);
router.delete("/baja/(:id)", Pasaje.remove);
router.get("/listar", Pasaje.list);


module.exports = router;
