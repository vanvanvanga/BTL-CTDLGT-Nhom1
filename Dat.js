async function modifyCpa(students, mssv, newCpa) {
  newCpa = parseFloat(newCpa);

  let result = new Promise((resolve, reject) => {
    if (typeof newCpa !== "number" || newCpa < 0 || newCpa > 4) {
      reject("Invalid CPA value. Please enter a number between 0 and 4.");
    }

    const student = students.find((student) => student.mssv === mssv);
    if (!student) {
      reject(`Student with MSSV ${mssv} not found.`);
    }

    student.cpa = newCpa;
    resolve(`Updated CPA for student ${mssv} to ${newCpa}.`);
  });

  console.log(await result);
}

async function findTopN(students, n) {
  let result = new Promise((resolve, reject) => {
    if (n < 1) reject("Tham số n phải >= 1");

    const sortedStudents = students.sort((a, b) => b.cpa - a.cpa);
    const topN = sortedStudents.slice(0, n);
    resolve(topN.map((student) => student.mssv).join("\n"));
  });

	console.log(`Top ${n} sinh viên có điểm cao nhất là: \n ${await result}`);
}

module.exports = {
  modifyCpa,
  findTopN,
};
