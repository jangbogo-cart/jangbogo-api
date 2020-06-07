var mysql_dbc = require("../../../config/db_con")();
var connection = mysql_dbc.init();
var SERVER_ERR_MSG = "Server Error";

exports.selectCartMList = async cart => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT cm.cart_idx
                    , cm.cart_name
                    , DATE_FORMAT(cm.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
                    , DATE_FORMAT(cm.update_date, '%Y-%c-%e %H:%i:%s') AS update_date
                 FROM tcart_master cm
                WHERE 1=1
                  AND cm.mb_idx = ?`;
    connection.query(sql, [cart.mb_idx], (err, result) => {
      if (err) {
        return resolve({
          code: 500,
          message: SERVER_ERR_MSG + ` err : ${err}`
        });
      } else {
        return resolve({ code: 200, message: "Success", data: result });
      }
    });
  });
};

// exports.selectMember = async member => {
//   return new Promise(resolve => {
//     var sql = `SELECT tm.idx
//                     , tm.id
//                     , DATE_FORMAT(tm.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
//                     , DATE_FORMAT(tm.update_date, '%Y-%c-%e %H:%i:%s') AS update_date
//                     , DATE_FORMAT(tm.recently_login_date, '%Y-%c-%e %H:%i:%s') AS recently_login_date
//                     FROM tmember tm
//                 WHERE 1=1
//                     AND tm.id = ?
//                 LIMIT 1`;
//     connection.query(sql, [member.id], (err, result) => {
//       if (err) {
//         return resolve({ code: 500, message: SERVER_ERR_MSG });
//       } else {
//         if (result.length > 0) {
//           //로그인성공
//           return resolve({ code: 200, message: "로그인 성공", data: result });
//         } else {
//           return resolve({ code: 201, message: "로그인 실패", data: result });
//         }
//       }
//     });
//   });
// };

// exports.loginMember = async member => {
//   return new Promise((resolve, reject) => {
//     var sql = `UPDATE tmember SET
//                recently_login_date = NOW()
//                 WHERE id = ?`;
//     connection.query(sql, [member.id], (err, result) => {
//       if (err) {
//         return reject({ code: 500, message: SERVER_ERR_MSG });
//       } else {
//         if (result.affectedRows == 0) {
//           return resolve({ code: 201, message: "Login Fail, ID can not find" });
//         } else {
//           return resolve({ code: 200, message: "Login Success" });
//         }
//       }
//     });
//   });
// };

exports.insertCartM = async cart => {
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO tcart_master (mb_idx, cart_name, reg_date, update_date) 
                                  VALUES (?, ?, NOW(), NOW())`;
    connection.query(sql, [cart.mb_idx, cart.cart_name], (err, result) => {
      if (err) {
        return reject({
          code: 500,
          message: `${SERVER_ERR_MSG}, err : ${err}`
        });
      } else {
        console.log(result);
        if (result.affectedRows == 0) {
          return resolve({ code: 201, message: "Regist Fail" });
        } else {
          return resolve({
            code: 200,
            message: "Regist Success",
            data: { cart_idx: result.insertId, cart_name: cart.cart_name }
          });
        }
      }
    });
  });
};

exports.updateCartM = async cart => {
  return new Promise((resolve, reject) => {
    let addSql = ``;
    let params = [];
    if (cart.cart_name) {
      addSql += ` , cart_name = ?`;
      params.push(cart.cart_name);
    }
    if (cart.cart_status) {
      addSql += ` , cart_status = ?`;
      params.push(cart.cart_status);
    }
    params.push(cart.cart_idx, cart.mb_idx);
    let sql = `UPDATE tcart_master SET
                      update_date = NOW()
                      ${addSql}
                WHERE cart_idx = ?
                  AND mb_idx = ?`;
    // console.log(connection.format(sql, params));
    connection.query(sql, params, (err, result) => {
      if (err) {
        return reject(`${SERVER_ERR_MSG}, err : ${err}`);
      } else {
        return resolve(result.affectedRows);
      }
    });
  });
};

exports.deleteCartM = async cart => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM tcart_master 
                WHERE cart_id = ?`;
    connection.query(sql, [cart.cart_id], (err, result) => {
      if (err) {
        return reject(`${SERVER_ERR_MSG}, err : ${err}`);
      } else {
        return resolve(result.affectedRows);
      }
    });
  });
};
