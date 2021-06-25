var express = require("express");
var router = express.Router();
const Valoracion = require("../controller/valoracion");

router.get("/listar_por_viaje/(:id)", Valoracion.listByTravel);
router.post("/alta", Valoracion.create);

module.exports = router;
