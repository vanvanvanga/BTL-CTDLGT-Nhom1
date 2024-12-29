const log = require("./input.js");

async function modifyCpa(students, mssv, newCpa) {
  newCpa = parseFloat(newCpa);

  let result = new Promise((resolve, reject) => {
    if (typeof newCpa !== "number" || newCpa < 0 || newCpa > 4) {
      reject(" Giá trị CPA không hợp lệ. Vui lòng nhập một số từ 0 đến 4.");
    }

    const student = students.find((student) => student.mssv === mssv);
    if (!student) {
      reject(`Student với MSSV ${mssv} không tìm thấy.`);
    }

    student.cpa = newCpa;
    log.save(students);
    resolve(`CPA đã cập nhật cho sinh viên ${mssv} thành ${newCpa}.`);
  });

  console.log(await result);
}

async function findTopN(students, n) {
  let result = new Promise((resolve, reject) => {
    if (n < 1) reject("Tham số n phải >= 1");

    const sortedStudents = students.sort((a, b) => b.cpa - a.cpa);
    const topN = sortedStudents.slice(0, n);
    resolve(`Top ${n} sinh viên có CPA cao nhất là: \n` + topN.map((student) => student.mssv).join("\n"));
  });

	console.log(await result);
}

module.exports = {
  modifyCpa,
  findTopN,
};
