var express = require("express");
var router = express.Router();
const Ciudad = require("../controller/ciudad");
const verify = require("../controller/verifyToken");

router.get("/listar", Ciudad.list);
router.put("/modificar",  Ciudad.update);
router.get("/buscar/(:id)", Ciudad.find);
router.post("/alta", Ciudad.create);
//router.put("/baja", Ciudad.delete)
router.get("/listar_rutas/(:id)", Ciudad.listRoutesForCity);

module.exports = router;
