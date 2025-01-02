// fs: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// const obj = json.parse(text); // convert text to obj
// const myJSON = JSON.stringify(obj); // convert obj to text (json format)
// const prompt = require('prompt-sync')();
// process.argv: an array containing arguments -- https://devdojo.com/bobbyiliev/how-to-pass-command-line-arguments-to-a-nodejs-app
// check if file exists: https://sebhastian.com/node-check-if-file-exists/
// require: https://expertbeacon.com/javascript-require-how-to-use-the-require-function-in-js/
// ---------------------

const fs = require("fs");
const ap = require("async-prompt");
const log = require("./input.js"); // nhập các hàm/biến... từ file này
const Van = require("./Van.js");
const Dat = require("./Dat.js");
const Minh = require("./Minh.js");
const Trang = require("./Trang.js");

const path = "./dataStudent_01.json";
module.exports = {
  path
}
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
      end                           Kết thúc chương trình
  `);
}

let cmd, cmd_a, cmd_s; // mảng chứa các tham số trong câu lệnh người dùng nhập

async function prompt() {
  cmd = await ap("Nhập câu lệnh và nhấn Enter để chương trình xử lý.\n");
  cmd_a = cmd.split('"');
  cmd_s = cmd.split(" ");
  // console.log(cmd);
  // console.log(cmd_a);
  // console.log(cmd_s);

  switch (cmd_s[0]) {
    case "help":
      help();
      prompt();
      break;

    case "list":
      console.log(Trang.list(data));
      prompt();
      break;

    case "find":
      if (cmd_s[1] === "canhcao") {
        Minh.findCanhCao(data);
      } else {
        Trang.find(cmd_s[1], data);
      }
      prompt();
      break;

    case "modify":
      if (cmd_s[1] === "cpa") {
        Dat.modifyCpa(data, parseFloat(cmd_s[2]), cmd_s[3]);
      }
      prompt();
      break;

    case "findtop":
      Dat.findTopN(data, parseInt(cmd_s[1]));
      prompt();
      break;

    case "findbottom":
      Minh.findBottomN(data, parseInt(cmd_s[1]));
      prompt();
      break;

    case "fill":
      log.addRand(cmd_s[1], data);
      prompt();
      break;

    case "input":
      log.add(cmd, data);
      prompt();
      break;

    case "forceFill":
      log.addExtended(data);
      prompt();
      break;

    case "cnt":
      Van.cntBtwn(cmd_s[1], cmd_s[2], data);
      prompt();
      break;

    case "cntSuspnd":
      Van.cntSuspnd(data);
      prompt();
      break;

    case "end":
      console.log("Chương trình kết thúc tại đây.");
      break;

    default:
      console.log("Đã có lỗi xảy ra hoặc không có lệnh nào được nhập.");
      console.log("Nhập `help` để xem các câu lệnh có thể sử dụng.");
      prompt();
      break;
  }
}

prompt();

