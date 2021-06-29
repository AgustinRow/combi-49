var express = require("express");
var router = express.Router();
const Test = require("../controller/test");

router.post("/testear_pasajero", Test.create);

module.exports = router;
