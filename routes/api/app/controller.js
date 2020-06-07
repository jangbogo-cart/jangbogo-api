const appVersion_ = require("../app/mng/common");
const SERVER_ERR_MSG = "Server Error";

exports.registAppVersion = async params => {
  try {
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    const osArr = {
      android: "android",
      ios: "ios"
    };
    if (!osArr[params["os"]]) {
      throw new Error("parameter error [os]");
    }
    if (!params["version"]) {
      throw new Error("parameter error [version]");
    }
    const appVersion = {
      os: osArr[params["os"]],
      version: params["version"],
      updateYn: !params["update_yn"] ? "N" : params["update_yn"]
    };
    var result = await appVersion_.insertAppVersion(appVersion);
    resultObj.code = result.code;
    resultObj.message = result.message;
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG + ` err : ${err}`;
  } finally {
    return resultObj;
  }
};
exports.appVersion = async params => {
  try {
    console.log(params["os"]);
    var resultObj = { code: 500, message: SERVER_ERR_MSG };
    if (!params["os"]) {
      throw new Error("parameter error [os]");
    }
    const os = params["os"];

    var result = await appVersion_.lastestAppVersion(os);
    resultObj.code = result.code;
    resultObj.message = result.message;
    resultObj.data = result.data;
  } catch (err) {
    resultObj.code = 500;
    resultObj.message = SERVER_ERR_MSG;
  } finally {
    return resultObj;
  }
};
