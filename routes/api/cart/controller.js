const cart_ = require("../cart/mng/common");
const member_ = require("../member/mng/common");
const SERVER_ERR_MSG = "Server Error";

exports.regist = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const member = { idx: params["mb_idx"] };
    const cart = {
      cart_name: params["cart_name"],
      mb_idx: params["mb_idx"],
      sort: params["sort"] ? params["sort"] : 1
    };

    var memberInfo = await member_.selectMember_idx(member);

    if (memberInfo.code == 200) {
      cart.mb_id = memberInfo.data.id;
      console.log(cart);
      var cartResult = await cart_.insertCartM(cart);

      resultObj.code = cartResult.code;
      resultObj.message = cartResult.message;
      resultObj.data = cartResult.data;
    } else {
      resultObj.code = memberInfo.code;
      resultObj.message = memberInfo.message;
    }
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
      100: 100, //진행중
      200: 200 //완료
    };
    const cart = {
      cart_idx: params["cart_idx"],
      mb_idx: params["mb_idx"]
    };
    if (params["cart_name"]) {
      cart.cart_name = params["cart_name"];
    }
    if (params["sort"]) {
      cart.sort = params["sort"];
    }
    if (params["cart_status"]) {
      if (status[params["cart_status"]] != params["cart_status"]) {
        throw new Error("parameter error [cart_status]");
      }
      cart.cart_status = status[params["cart_status"]];
    }
    let rs = await cart_.updateCartM(cart);

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
    const member = { idx: params["mb_idx"] };
    const cart = { cart_idx: params["cart_idx"] };

    let rs = await cart_.deleteCartM(cart);

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

exports.list = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const member = { idx: params["mb_idx"] };
    const cart = {};

    var memberInfo = await member_.selectMember_idx(member);
    if (memberInfo.code == 200) {
      cart.mb_idx = params["mb_idx"];
      var cartResult = await cart_.selectCartMList(cart);

      resultObj.code = cartResult.code;
      resultObj.message = cartResult.message;
      resultObj.data = cartResult.data;
    } else {
      resultObj.code = memberInfo.code;
      resultObj.message = memberInfo.message;
    }
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG;
  } finally {
    return resultObj;
  }
};
