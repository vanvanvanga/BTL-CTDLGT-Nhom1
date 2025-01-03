const log = require("./input.js");
const srt = require("./sort.js");
const f = require("./find.js");

async function modifyCpa(students, mssv, newCpa) {
  newCpa = parseFloat(newCpa);

  let result = new Promise((resolve, reject) => {
    if (typeof newCpa !== "number" || newCpa < 0 || newCpa > 4) {
      reject(" Giá trị CPA không hợp lệ. Vui lòng nhập một số từ 0 đến 4.");
    }

    const student = f.lookForMSSV(students, mssv);
    if (!student) {
      reject(`Không tìm thấy sinh viên có MSSV ${mssv}.`);
    }

    student.cpa = newCpa;
    log.save(students);
    resolve(`Đã cập nhật CPA của sinh viên ${mssv} thành ${newCpa}.`);
  });

  console.log(await result);
}

async function findTopN(students, n) {
  let result = new Promise((resolve, reject) => {
    if (n < 1) reject("Tham số n phải >= 1");

    const sortedStudents = [...students];
    srt.sort(sortedStudents, "desc");
    const topN = sortedStudents.slice(0, n);
    resolve(`Top ${n} sinh viên có CPA cao nhất là: \n` + topN.map((student) => student.mssv).join("\n"));
  });

	console.log(await result);
}

module.exports = {
  modifyCpa,
  findTopN,
};
