const loginController = require("./controller/login");
const memberController = require("./controller/member");
const cartController = require("./routes/api/cart/controller");
const appController = require("./routes/api/app/controller");

exports.handler = async (event, context) => {
  let body;
  let statusCode = "200";
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.path) {
      case "/login": //로그인
        switch (event.httpMethod) {
          case "POST":
            var jsonObj = JSON.parse(event.body);
            body = await loginController.login(jsonObj);
            break;
          default:
            throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
        break;

      case "/member":
        switch (event.httpMethod) {
          case "POST": //회원가입
            var jsonObj = JSON.parse(event.body);
            body = await memberController.regist(jsonObj);
            break;
          case "GET": //회원목록 조회(개발용)
            body = await memberController.list();
            break;
          case "DELETE": //회원삭제 (개발용)
            var jsonObj = JSON.parse(event.body);
            body = await memberController.delete(jsonObj);
            break;
          default:
            throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
        break;

      case "/cart":
        switch (event.httpMethod) {
          case "POST":
            var jsonObj = JSON.parse(event.body);
            body = await cartController.regist(jsonObj);
            break;
          case "PATCH": //장바구니 수정
            var jsonObj = JSON.parse(event.body);
            body = await cartController.modify(jsonObj);
            break;
          case "DELETE": //장바구니 삭제
            var jsonObj = JSON.parse(event.body);
            body = await cartController.delete(jsonObj);
            break;
          default:
            throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
        break;

      case "/cart/list":
        switch (event.httpMethod) {
          case "POST":
            var jsonObj = JSON.parse(event.body);
            body = await cartController.list(jsonObj);
            break;
          default:
            throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
        break;

      case "/appversion":
        switch (event.httpMethod) {
          case "POST":
            var jsonObj = JSON.parse(event.body);
            body = await appController.registAppVersion(jsonObj);
            break;
          case "GET":
            var jsonObj = event.queryStringParameters;
            body = await appController.appVersion(jsonObj);
            break;
          default:
            throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
        break;

      default:
        throw new Error(`Unsupported method "${event.path}"`);
    }
  } catch (err) {
    statusCode = "400";
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
