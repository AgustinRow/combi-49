const express = require("express");
const router = express.Router();
const Provincia = require("../controller/provincia");
const verify = require("../controller/verifyToken");

router.get("/listar", Provincia.list);
router.post("/alta", Provincia.create);
router.get("/listar/(:id)", Provincia.listCities);
router.put("/modificar", Provincia.update);

module.exports = router;
