var express = require("express");
var router = express.Router();
const Vianda = require("../controller/vianda");
//const Estado = require("../controller/estado");
//const verify = require("../controller/verifyPayment");
router.post("/alta", Vianda.create);
router.put("/modificar", Vianda.update);
router.delete("/baja/(:id)", Vianda.remove);
router.post("/comprar", Vianda.buy);
router.get("/listar", Vianda.list);
router.get("/detalle/(:id)", Vianda.detail)

module.exports = router;
