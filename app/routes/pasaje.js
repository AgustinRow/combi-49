var express = require("express");
var router = express.Router();
const Pasaje = require("../controller/pasaje");
const Estado = require("../controller/estado");

//inicializa los estados de los pasajes
router.get("/inicializar_estado", Estado.create);

router.post("/comprar", Pasaje.create)


module.exports = router;
