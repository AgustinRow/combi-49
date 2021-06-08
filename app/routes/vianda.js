var express = require("express");
var router = express.Router();
const Vianda = require("../controller/vianda");
//const Estado = require("../controller/estado");
//const verify = require("../controller/verifyPayment");
router.post("/alta", Vianda.create);
router.put("/modificar", Vianda.update);

module.exports = router;
