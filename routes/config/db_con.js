var mysql = require("mysql");
const DB_NAME = "jangbogo";
const DB_USER = "jangbogo";
const DB_PASS = "qwer1234!";
const DB_PORT = 3306;
const DB_HOST_DEV =
  "real-jangbogo.cvgr2tuns5zf.ap-northeast-2.rds.amazonaws.com";
const DB_HOST_REAL =
  "real-jangbogo.cvgr2tuns5zf.ap-northeast-2.rds.amazonaws.com";
let DB_HOST = "";
if (process.env.LOCAL_ENV == "REAL") {
  DB_HOST = DB_HOST_REAL;
} else {
  DB_HOST = DB_HOST_DEV;
}
console.log(
  `====================${process.env.LOCAL_ENV}=======================`
);
console.log(`DB HOST : ${DB_HOST}`);
console.log(`DB PORT : ${DB_PORT}`);
console.log(`DB USER : ${DB_USER}`);
console.log(`DB NAME : ${DB_NAME}`);
console.log(
  `===================================================================`
);
module.exports = function() {
  return {
    init: function() {
      return connection;
    },
    test_open: function(con) {
      con.connect(function(err) {
        if (err) {
          console.error("mysql connection error :" + err);
        } else {
          console.info("mysql is connected successfully.");
        }
      });
    }
  };
};

var connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
});
