const member_ = require("../routes/api/member/mng/common");
const SERVER_ERR_MSG = "Server Error";
exports.login = async event => {
  var resultCode = 500;
  var resultMsg = SERVER_ERR_MSG;
  var resultData = null;
  try {
    const member = { id: event["id"] };

    var rs = await member_.selectMember(member);
    resultData = rs.data;
    if (rs.code == 200) {
      var loginResult = await member_.loginMember(member);
      resultCode = loginResult.code;
      resultMsg = loginResult.message;
    } else {
      resultCode = rs.code;
      resultMsg = rs.message;
      resultData = null;
    }
  } catch (err) {
    resultCode = 500;
    resultMsg = SERVER_ERR_MSG;
  } finally {
    const response = {
      code: resultCode,
      message: resultMsg,
      data: resultData
    };
    return response;
  }
};
