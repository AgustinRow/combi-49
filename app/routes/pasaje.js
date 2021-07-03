var express = require("express");
var router = express.Router();
const Pasaje = require("../controller/pasaje");
const Estado = require("../controller/estado");
const verify = require("../controller/verifyPayment");

//inicializa los estados de los pasajes,
//ejecutar esta api antes de comprar pasajes
router.get("/inicializar_estado", Estado.create);

router.post("/comprar", Pasaje.create);
router.get("/buscar/(:id)", Pasaje.findTravelsForUser);
router.delete("/borrar/(:id)", Pasaje.remove);
router.get("/listar", Pasaje.list);
router.put("/cancelar/(:id)", Pasaje.cancel);
router.get("/listar_por_usuario/(:id)", Pasaje.listUsedTicket);
router.get("/pasajero_ausente/(:id)", Pasaje.ausente);
module.exports = router;
