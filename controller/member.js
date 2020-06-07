/* aws Lambda 실행파일*/
const member_ = require("../routes/api/member/mng/common");
const SERVER_ERR_MSG = "Server Error";

exports.list = async event => {
  var rs = await member_.selectMemberList();
  const response = {
    code: rs.code,
    message: rs.message,
    data: rs.data
  };
  return response;
};

exports.regist = async event => {
  try {
    var member = {
      id: event["id"]
    };

    var resultCode = 500;
    var resultMsg = SERVER_ERR_MSG;
    var resultData = null;

    var selectMember = await member_.selectMember(member);
    if (selectMember.code == 200) {
      resultCode = 201;
      resultMsg = `Fail, exist ID`;
    } else {
      var rs = await member_.insertMember(member);
      resultCode = rs.code;
      resultMsg = rs.message;
    }
  } catch (err) {
    resultCode = 500;
    resultMsg = SERVER_ERR_MSG;
  } finally {
    const response = {
      code: resultCode,
      message: resultMsg
    };
    return response;
  }
};

exports.delete = async event => {
  try {
    var member = {
      id: event["id"]
    };

    var resultCode = 500;
    var resultMsg = SERVER_ERR_MSG;
    var resultData = null;

    var selectMember = await member_.selectMember(member);
    if (selectMember.code != 200) {
      resultCode = 201;
      resultMsg = `Fail, cannot find ID`;
    } else {
      var rs = await member_.deleteMember(member);
      resultCode = rs.code;
      resultMsg = rs.message;
    }
  } catch (err) {
    resultCode = 500;
    resultMsg = SERVER_ERR_MSG;
  } finally {
    const response = {
      code: resultCode,
      body: resultMsg
    };
    return response;
  }
};
