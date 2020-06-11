const CART_DETAIL = require("../cartdt/mng/common");
const MEMBER = require("../member/mng/common");
const SERVER_ERR_MSG = "Server Error";

exports.list = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const cart_detail = {
      cart_idx: params["cart_idx"],
      item_name: params["item_name"]
    };
    var result = await CART_DETAIL.selectCartDetailList(cart_detail);

    resultObj.code = result.code;
    resultObj.message = result.message;
    resultObj.data = result.data;
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG + ` err : ${JSON.stringify(err)}`;
  } finally {
    return resultObj;
  }
};

exports.regist = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const cart_detail = {
      cart_idx: params["cart_idx"],
      item_name: params["item_name"]
    };

    var cartResult = await CART_DETAIL.insertCartDetail(cart_detail);

    resultObj.code = cartResult.code;
    resultObj.message = cartResult.message;
    resultObj.data = cartResult.data;
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG + ` err : ${JSON.stringify(err)}`;
  } finally {
    return resultObj;
  }
};

exports.modify = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const status = {
      100: 100, //구매전
      200: 200, //구매완료
      300: 300 //구매보류
    };
    const cart_detail = {
      cart_dt_idx: params["cart_dt_idx"],
      item_name: params["item_name"]
    };
    if (params.status) {
      cart_detail.status = params.status;
    }
    if (params.item_price) {
      cart_detail.item_price = params.item_price;
    }
    if (params.item_qty) {
      cart_detail.item_qty = params.item_qty;
    }
    if (params.sort) {
      cart_detail.sort = params.sort;
    }

    var rs = await CART_DETAIL.updateCartDetail(cart_detail);

    if (rs == 1) {
      resultObj.code = 200;
      resultObj.message = "success";
    } else {
      resultObj.code = 500;
      resultObj.message = "fail, cannot find data";
    }
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG + ` err : ${JSON.stringify(err)}`;
  } finally {
    return resultObj;
  }
};

exports.delete = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const cart_detail = {
      cart_dt_idx: params["cart_dt_idx"]
    };

    var rs = await CART_DETAIL.deleteCartDetail(cart_detail);

    if (rs == 1) {
      resultObj.code = 200;
      resultObj.message = "success";
    } else {
      resultObj.code = 500;
      resultObj.message = "fail, cannot find data";
    }
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG + ` err : ${JSON.stringify(err)}`;
  } finally {
    return resultObj;
  }
};
