var express = require("express");
var router = express.Router();
const Valoracion = require("../controller/valoracion");

router.get("/listar", Valoracion.list)
router.post("/alta", Valoracion.create)

module.exports = router;
