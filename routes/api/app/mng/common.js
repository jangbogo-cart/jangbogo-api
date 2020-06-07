var mysql_dbc = require("../../../config/db_con")();
var connection = mysql_dbc.init();
var SERVER_ERR_MSG = "Server Error";

exports.lastestAppVersion = async os => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT av.os
                    , av.version
                    , av.update_yn
                    , DATE_FORMAT(av.reg_date, '%Y-%m-%d') AS reg_date
                 FROM tapp_version av
                WHERE av.os = ?
                ORDER BY av.idx desc
                LIMIT 1`;
    connection.query(sql, [os], (err, result) => {
      if (err) {
        return resolve({
          code: 500,
          message: SERVER_ERR_MSG + ` err : ${err}`
        });
      } else {
        return resolve({ code: 200, message: "Success", data: result[0] });
      }
    });
  });
};

exports.insertAppVersion = async appVersion => {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO tapp_version (os, version, update_yn, reg_date) 
                                 VALUES (?, ?, ?, NOW())`;
    connection.query(
      sql,
      [appVersion.os, appVersion.version, appVersion.updateYn],
      (err, result) => {
        if (err) {
          return reject({
            code: 500,
            message: `${SERVER_ERR_MSG}, err : ${err}`
          });
        } else {
          if (result.affectedRows == 0) {
            return resolve({ code: 201, message: "Regist Fail" });
          } else {
            return resolve({
              code: 200,
              message: "Regist Success"
            });
          }
        }
      }
    );
  });
};
