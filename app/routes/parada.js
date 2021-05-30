const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Parada = require("../controller/parada");

router.get("/listar/(:id)", Parada.list);
router.post("/alta", Parada.create);
router.delete("/baja", Parada.remove);

module.exports = router;
