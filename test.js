var express = require("express");
var router = express.Router();
// /* 로컬 실행 파일 */
const member_ = require("./routes/api/member/mng/common");
const cart_ = require("./routes/api/cart/controller");
const appController = require("./routes/api/app/controller");
const index = require("./index");

router.post("/", async function(req, res) {
  console.log(req.body);
  var jsonObj = JSON.parse(req.body);
  jsonObj.body = JSON.stringify(jsonObj.body);
  var rs = await index.handler(jsonObj);

  res.json({ code: 200, body: rs });
});

module.exports = router;
