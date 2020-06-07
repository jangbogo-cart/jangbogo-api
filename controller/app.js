/* aws Lambda 실행파일*/
const app_ = require("../routes/api/app/controller");
const SERVER_ERR_MSG = "Server Error";

exports.regist = async event => {
  var rs = await app_.regist(event);
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};

exports.version = async event => {
  var rs = await app_.version(event);
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};
