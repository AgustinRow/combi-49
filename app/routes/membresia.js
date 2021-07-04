var express = require("express");
var router = express.Router();
const Membresia = require("../controller/membresia");

router.post("/contratar", Membresia.create);
router.put("/cancelar", Membresia.cancel);
module.exports = router;
