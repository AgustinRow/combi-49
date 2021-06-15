var express = require("express");
var router = express.Router();
const Ruta = require("../controller/ruta");
const verify = require("../controller/verifyToken");

router.get("/listar", Ruta.list);
router.post("/alta", Ruta.create);
router.get("/detalle", Ruta.getRoute);
router.put("/modificar", Ruta.update);
router.delete("/borrar/(:id)", Ruta.remove);
module.exports = router;
