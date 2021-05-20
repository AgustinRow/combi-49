var express = require("express");
var router = express.Router();
const Ruta = require("../controller/ruta");
const verify = require("../controller/verifyToken");

router.get("/listar", Ruta.list);
router.post("/alta", Ruta.create);
router.get("/listar_rutas_origen/(:id)", Ruta.listOrigin);
router.get("/detalle", Ruta.getRoute);
//router.get("/modificar", Ruta.update)

module.exports = router;
