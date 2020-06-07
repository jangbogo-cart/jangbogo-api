/* aws Lambda 실행파일*/
const cart_ = require("../routes/api/cart/controller");
const SERVER_ERR_MSG = "Server Error";

exports.regist = async event => {
  var rs = await cart_.regist(event);
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};

exports.list = async event => {
  var rs = await cart_.list(event);
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};

exports.modify = async event => {
  var rs = await cart_.modify(event);
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};

exports.delete = async event => {
  var rs = await cart_.delete(event);
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};
