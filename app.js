// /* 로컬 실행 파일 */
const member_ = require("./routes/api/member/mng/common");
const cart_ = require("./routes/api/cart/controller");
const appController = require("./routes/api/app/controller");
const index = require("./index");

(async () => {
  var param = {
    mb_idx: 31,
    cart_idx: 3,
    cart_name: "test2222111",
    cart_status: 200
  };

  // var rs = await cart_.regist(param);
  var rs = await cart_.modify(param);
  console.log(JSON.stringify(rs));
})();
