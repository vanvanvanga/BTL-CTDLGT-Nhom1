// fs: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// const obj = json.parse(text); // convert text to obj
// const myJSON = JSON.stringify(obj); // convert obj to text (json format)
// const prompt = require('prompt-sync')();
// process.argv: an array containing arguments -- https://devdojo.com/bobbyiliev/how-to-pass-command-line-arguments-to-a-nodejs-app
// check if file exists: https://sebhastian.com/node-check-if-file-exists/
// require: https://expertbeacon.com/javascript-require-how-to-use-the-require-function-in-js/
// ---------------------

const fs = require("fs");
const log = require("./input.js"); // nhập các hàm/biến... từ file này
const Van = require("./Van.js");
const Dat = require("./Dat.js");
const Minh = require("./Minh.js");
const Trang = require("./Trang.js");

const path = "./data.json";
let data = []; // mảng chứa thông tin sinh viên

if (fs.existsSync(path) && fs.statSync(path).size !== 0) {
  const contents = fs.readFileSync(path, "utf8");
  data = JSON.parse(contents);
} // copy thông tin từ file data.json sang mảng data
function help() {
  console.log(`
    Chào mừng đến với trình quản lý sinh viên ahihihi v0.1!
    Dưới đây là danh sách các câu lệnh bạn có thể dùng:
      help                          Hiển thị các câu lệnh có thể sử dụng trong chương trình. 
      list                          In ra danh sách sinh viên đang học
      find <mssv>                   Tìm sinh viên có mã số sinh viên <mssv>
      modify cpa <mssv> <cpa_mới>   Thay đổi cpa của sinh viên
      findtop <n>                   Tìm <n> sinh viên có cpa cao nhất
      findbottom <n>                Tìm <n> sinh viên có cpa thấp nhất
      find canhcao                  Tìm các sinh viên đang bị cảnh cáo
      cnt <a> <b>                   Đếm số sinh viên có điểm cpa là nằm trong đoạn [a;b]
      cntSuspnd                     Tính số lượng sinh viên phải đình chỉ học
  `);
}

let cmd = process.argv; // mảng chứa các tham số trong câu lệnh người dùng nhập

switch (cmd[2]) {
  case "help":
    help();
    break;

    case "list":
    console.log(Trang.list(data));
    break;

  case "find":
    if (cmd[3]) {
      console.log(Trang.find(cmd[3], data));
    } else {
      console.log("Vui lòng cung cấp MSSV để tìm kiếm.");
    }
    break;

    case "modify":
    if (cmd[3] === "cpa") {
      const result = Dat.modifyCpa(cmd[4], parseFloat(cmd[5]), data);
      console.log(result);
    }
    break;

  case "findtop":
    const topResult = Dat.findTop(parseInt(cmd[3]), data);
    console.log(topResult);
    break;

  case "fill":
    log.addRand(cmd[3], data);
    break;

  case "input":
    log.add(cmd, data);
    break;

  case "cnt":
    console.log(Van.cntBtwn(cmd, data));
    break;

  case "cntSuspnd":
    console.log(Van.cntSuspnd(data)); // will take some time
    console.log("Trong lúc chờ, hãy đi châm một ấm trà.");
    break;

  default:
    console.log("Đã có lỗi xảy ra hoặc không có lệnh nào được nhập.");
    console.log("Nhập `help` để xem các câu lệnh có thể sử dụng.");
    break;
}