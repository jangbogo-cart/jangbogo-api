var mysql_dbc = require("../../../config/db_con")();
var connection = mysql_dbc.init();
var SERVER_ERR_MSG = "Server Error";

exports.selectCartMList = async cart => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT cm.cart_idx
                    , cm.cart_name
                    , cm.cart_status
                    , cm.sort
                    , IFNULL(xx.total_price, 0) AS total_price
                    , IFNULL(xx.total_item_count, 0) AS total_item_count
                    , IFNULL(xx.total_finish_count, 0) AS total_finish_count
                    , DATE_FORMAT(cm.deadline_date , '%Y-%c-%e %H:%i:%s') AS deadline_date
                    , DATE_FORMAT(cm.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
                    , DATE_FORMAT(cm.update_date, '%Y-%c-%e %H:%i:%s') AS update_date
                FROM tcart_master cm
                LEFT JOIN (SELECT cd.cart_idx 
                            , SUM(cd.item_price*cd.item_qty) AS total_price
                            , COUNT(1) AS total_item_count
                            , SUM(CASE WHEN cd.status = '200' THEN 1 ELSE 0 END) AS total_finish_count
                        FROM tcart_detail cd
                  INNER JOIN tcart_master cm
                        WHERE cm.cart_idx = cd.cart_idx 
                          AND cm.mb_idx = ?
                        GROUP BY cd.cart_idx 
                      ) xx
                  ON cm.cart_idx = xx.cart_idx
                WHERE 1=1
                  AND cm.mb_idx = ?
                ORDER BY cm.sort asc, cm.cart_idx asc `;
    connection.query(sql, [cart.mb_idx, cart.mb_idx], (err, result) => {
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

exports.insertCartM = async cart => {
  return new Promise((resolve, reject) => {
    var params = [];
    var addSql = "";
    if (!cart.deadline_date) {
      params = [cart.mb_idx, cart.cart_name, cart.sort];
      addSql = ` DATE_ADD(NOW(), INTERVAL 1 DAY)`;
    } else {
      params = [cart.mb_idx, cart.cart_name, cart.sort, cart.deadline_date];
      addSql = ` ?`;
    }

    var sql = `INSERT INTO tcart_master (mb_idx, cart_name, sort, deadline_date, reg_date, update_date) 
                                  VALUES (?, ?, ?, ${addSql}, NOW(), NOW())`;
    connection.query(sql, params, (err, result) => {
      if (err) {
        return reject({
          code: 500,
          message: `${SERVER_ERR_MSG}, err : ${err}`
        });
      } else {
        // console.log(result);
        if (result.affectedRows == 0) {
          return resolve({ code: 201, message: "Regist Fail" });
        } else {
          return resolve({
            code: 200,
            message: "Regist Success",
            data: {
              cart_idx: result.insertId,
              cart_name: cart.cart_name,
              cart_status: 100,
              sort: cart.sort,
              total_price: 0,
              total_item_count: 0,
              total_finish_count: 0,
              deadline_date: cart.deadline_date
            }
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
    if (cart.sort) {
      addSql += ` , sort = ?`;
      params.push(cart.sort);
    }
    if (cart.deadline_date) {
      addSql += ` , deadline_date = DATE(?)`;
      params.push(cart.deadline_date);
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
                WHERE cart_idx = ?`;
    connection.query(sql, [cart.cart_idx], (err, result) => {
      if (err) {
        return reject(`${SERVER_ERR_MSG}, err : ${err}`);
      } else {
        return resolve(result.affectedRows);
      }
    });
  });
};
