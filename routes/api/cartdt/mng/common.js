var mysql_dbc = require("../../../config/db_con")();
var connection = mysql_dbc.init();
var SERVER_ERR_MSG = "Server Error";

exports.selectCartDetailList = async cart_detail => {
  return new Promise((resolve, reject) => {
    var params = [cart_detail.cart_idx];
    var sql = `SELECT cd.cart_dt_idx
                    , cd.status
                    , cd.item_name
                    , cd.item_price
                    , cd.item_qty
                    , cd.sort
                    , DATE_FORMAT(cd.reg_date, '%Y-%c-%e %H:%i:%s') AS reg_date
                    , DATE_FORMAT(cd.update_date, '%Y-%c-%e %H:%i:%s') AS update_date
                FROM tcart_master cm
        INNER JOIN tcart_detail cd
                ON cm.cart_idx = cd.cart_idx
                WHERE 1=1
                AND cm.cart_idx = ?
                ORDER BY cd.sort asc, cd.cart_dt_idx asc `;
    console.log(connection.format(sql, params));
    connection.query(sql, params, (err, result) => {
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

exports.insertCartDetail = async cart_detail => {
  return new Promise((resolve, reject) => {
    var addSql1 = ``;
    var addSql2 = ``;
    var params = [cart_detail.cart_idx, cart_detail.item_name];

    if (cart_detail.status) {
      addSql1 += ` status,`;
      addSql2 += ` ?, `;
      params.push(cart_detail.status);
    }
    if (cart_detail.item_price) {
      addSql1 += ` item_price,`;
      addSql2 += ` ?, `;
      params.push(cart_detail.item_price);
    }
    if (cart_detail.item_qty) {
      addSql1 += ` item_qty,`;
      addSql2 += ` ?, `;
      params.push(cart_detail.item_qty);
    }
    if (cart_detail.sort) {
      addSql1 += ` sort,`;
      addSql2 += ` ?, `;
      params.push(cart_detail.sort);
    }

    var sql = `INSERT INTO tcart_detail (cart_idx, item_name, ${addSql1} reg_date, update_date) 
                                 VALUES (?, ?, ${addSql2} NOW(), NOW())`;
    console.log(connection.format(sql, params));
    connection.query(sql, params, (err, result) => {
      if (err) {
        return resolve({
          code: 500,
          message: SERVER_ERR_MSG + ` err : ${err}`
        });
      } else {
        if (result.affectedRows == 0) {
          return resolve({ code: 201, message: "Regist Fail" });
        } else {
          return resolve({
            code: 200,
            message: "Regist Success",
            data: {
              cart_dt_idx: result.insertId,
              item_name: cart_detail.item_name,
              status: 100,
              sort: cart_detail.sort ? cart_detail.sort : 1,
              item_price: cart_detail.item_price ? cart_detail.item_price : 0,
              item_qty: cart_detail.item_qty ? cart_detail.item_qty : 0
            }
          });
        }
      }
    });
  });
};

exports.updateCartDetail = async cart_detail => {
  return new Promise((resolve, reject) => {
    let addSql = ``;
    let params = [];
    if (cart_detail.item_name) {
      addSql += ` , item_name = ?`;
      params.push(cart_detail.item_name);
    }
    if (cart_detail.status) {
      addSql += ` , status = ?`;
      params.push(cart_detail.status);
    }
    if (cart_detail.item_price) {
      addSql += ` , item_price = ?`;
      params.push(cart_detail.item_price);
    }
    if (cart_detail.item_qty) {
      addSql += ` , item_qty = ?`;
      params.push(cart_detail.item_qty);
    }
    if (cart_detail.sort) {
      addSql += ` , sort = ?`;
      params.push(cart_detail.sort);
    }
    params.push(cart_detail.cart_dt_idx);
    let sql = `UPDATE tcart_detail SET
                      update_date = NOW()
                      ${addSql}
                WHERE cart_dt_idx = ?`;
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

exports.deleteCartDetail = async cart_detail => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM tcart_detail 
                WHERE cart_dt_idx = ?`;
    connection.query(sql, [cart_detail.cart_dt_idx], (err, result) => {
      if (err) {
        return reject(`${SERVER_ERR_MSG}, err : ${err}`);
      } else {
        return resolve(result.affectedRows);
      }
    });
  });
};
