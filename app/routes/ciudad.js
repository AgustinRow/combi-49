var express = require("express");
var router = express.Router();
const Ciudad = require("../controller/ciudad");
const verify = require("../controller/verifyToken");

router.get("/listar", Ciudad.listCities);
//router.put("/modificar/(:id)", verify, Ciudad.update);
router.get("/buscar/(:id)", verify, Ciudad.find);
router.post("/alta", verify, Ciudad.create);
//router.put("/baja(:id)", verify, Ciudad.delete)
module.exports = router;
