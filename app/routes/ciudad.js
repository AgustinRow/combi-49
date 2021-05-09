var express = require("express");
var router = express.Router();
const Ciudad = require("../controller/ciudad");
const verify = require("../controller/verifyToken");

router.get("/listar", Ciudad.listCities);
//router.post("/alta", verify, Ciudad.create);
//router.put("/modificar", verify, Ciudad.update)
//router.get("/buscar", Ciudad.find);

module.exports = router;
