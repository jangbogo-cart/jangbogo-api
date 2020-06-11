var express = require("express");
var router = express.Router();
const index = require("./index");

router.post("/", async function(req, res) {
  console.log(req.originalUrl);
  var jsonObj = req.body;
  console.log(`path : ${jsonObj.path}`);
  console.log(`httpMethod : ${jsonObj.httpMethod}`);
  console.log(`body : ${JSON.stringify(jsonObj.body)}`);

  var paramObj = {
    path: jsonObj.path,
    httpMethod: jsonObj.httpMethod,
    body: JSON.stringify(jsonObj.body)
  };
  var rs = await index.handler(paramObj);
  var result = JSON.parse(rs.body);
  res.json(result);
});

module.exports = router;
