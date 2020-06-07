// /* 로컬 실행 파일 */
const member_ = require("./routes/api/member/mng/common");
const cart_ = require("./routes/api/cart/controller");
const appController = require("./routes/api/app/controller");
const index = require("./index");
var express = require("express");
var app = express();
var http = require("http");
var cors = require("cors");
var bodyParser = require("body-parser");
app.set("port", process.env.PORT || 3031);

// app.listen(port, ()=> winston.info(`Listening on port ${port}...`));

http.createServer(app).listen(app.get("port"), function() {
  console.log(`Listening on port ${app.get("port")}...`);
  // console.log('Express server listening on port ' + app.get('port'));
});

var allowCORS = function(req, res, next) {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accecpt, Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
};

app.use(allowCORS);
app.use(cors());

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "200mb"
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

app.use("/", require("./test"));

// var port = 3000;
// app.listen(port, function() {
//   console.log("server on! http://localhost:" + port);
// });

// (async () => {
//   var param = {
//     mb_idx: 31,
//     cart_idx: 3,
//     cart_name: "test2222111",
//     cart_status: 200
//   };

//   // var rs = await cart_.regist(param);
//   var rs = await cart_.modify(param);
//   console.log(JSON.stringify(rs));
// })();
