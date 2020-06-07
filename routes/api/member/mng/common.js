var mysql_dbc = require("../../../config/db_con")();
var connection = mysql_dbc.init();
const SERVER_ERR_MSG = "Server Error";

exports.selectMemberList = async () => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT tm.idx
                    , tm.id
                    , tm.pw
                    , DATE_FORMAT(tm.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
                    , DATE_FORMAT(tm.update_date, '%Y-%c-%e %H:%i:%s') AS update_date
                 FROM tmember tm 
                WHERE 1=1`;
    connection.query(sql, [], (err, result) => {
      if (err) {
        return resolve({ code: 500, message: SERVER_ERR_MSG });
      } else {
        return resolve({ code: 200, message: "Success", data: result });
      }
    });
  });
};

exports.selectMember = async member => {
  return new Promise(resolve => {
    var sql = `SELECT tm.idx
                    , tm.id
                    , DATE_FORMAT(tm.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
                    , DATE_FORMAT(tm.update_date, '%Y-%c-%e %H:%i:%s') AS update_date 
                    , DATE_FORMAT(tm.recently_login_date, '%Y-%c-%e %H:%i:%s') AS recently_login_date 
                    FROM tmember tm 
                WHERE 1=1 
                    AND tm.id = ?
                LIMIT 1`;
    connection.query(sql, [member.id], (err, result) => {
      if (err) {
        return resolve({ code: 500, message: SERVER_ERR_MSG });
      } else {
        if (result.length > 0) {
          //로그인성공
          return resolve({
            code: 200,
            message: "로그인 성공",
            data: result[0]
          });
        } else {
          return resolve({
            code: 201,
            message: "로그인 실패",
            data: result[0]
          });
        }
      }
    });
  });
};

exports.selectMember_idx = async member => {
  return new Promise(resolve => {
    var sql = `SELECT tm.idx
                    , tm.id
                    , DATE_FORMAT(tm.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
                    , DATE_FORMAT(tm.update_date, '%Y-%c-%e %H:%i:%s') AS update_date 
                    , DATE_FORMAT(tm.recently_login_date, '%Y-%c-%e %H:%i:%s') AS recently_login_date 
                    FROM tmember tm 
                WHERE 1=1 
                    AND tm.idx = ?
                LIMIT 1`;
    console.log(connection.format(sql, [member.idx]));
    connection.query(sql, [member.idx], (err, result) => {
      if (err) {
        return resolve({ code: 500, message: SERVER_ERR_MSG });
      } else {
        if (result.length > 0) {
          //로그인성공
          return resolve({
            code: 200,
            message: "회원조회 성공",
            data: result[0]
          });
        } else {
          return resolve({
            code: 201,
            message: "회원없음",
            data: result[0]
          });
        }
      }
    });
  });
};

exports.loginMember = async member => {
  return new Promise((resolve, reject) => {
    var sql = `UPDATE tmember SET
               recently_login_date = NOW()
                WHERE id = ?`;
    connection.query(sql, [member.id], (err, result) => {
      if (err) {
        return reject({ code: 500, message: SERVER_ERR_MSG });
      } else {
        if (result.affectedRows == 0) {
          return resolve({ code: 201, message: "Login Fail, ID can not find" });
        } else {
          return resolve({ code: 200, message: "Login Success" });
        }
      }
    });
  });
};

exports.insertMember = async member => {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO tmember (id, reg_date, update_date) 
                                  VALUES (?, NOW(), NOW())`;
    connection.query(sql, [member.id], (err, result) => {
      if (err) {
        return reject({
          code: 500,
          message: `${SERVER_ERR_MSG}, err : ${err}`
        });
      } else {
        if (result.affectedRows == 0) {
          return resolve({ code: 201, message: "Regist Fail" });
        } else {
          return resolve({ code: 200, message: "Regist Success" });
        }
      }
    });
  });
};

exports.deleteMember = async member => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM tmember WHERE id = ?`;
    connection.query(sql, [member.id], (err, result) => {
      if (err) {
        return reject({
          code: 500,
          message: `${SERVER_ERR_MSG}, err : ${err}`
        });
      } else {
        if (result.affectedRows == 0) {
          return resolve({ code: 201, message: "Delete Fail" });
        } else {
          return resolve({ code: 200, message: "Delete Success" });
        }
      }
    });
  });
};

// module.exports = router;
