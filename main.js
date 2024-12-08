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

const path = "./data.json";
let data = []; // mảng chứa thông tin sinh viên

if (fs.existsSync(path) && fs.statSync(path).size !== 0) {
  const contents = fs.readFileSync(path, "utf8");
  data = JSON.parse(contents);
} // copy thông tin từ file data.json sang mảng data

let cmd = process.argv; // mảng chứa các tham số trong câu lệnh người dùng nhập

switch (cmd[2]) {
  case "input":
    log.add(cmd, data);
    break;

  case "cnt":
    console.log(Van.cntBtwn(cmd[3], cmd[4], data));
    break;

  case "cntSuspnd":
    console.log(Van.cntSuspnd(data));
    break;

  default:
    console.log(cmd);
    //console.log("Da co loi xay ra hoac khong co lenh nao duoc nhap.");
    break;
}

console.log(cmd);