async function findBottomN(students, n) {
  let result = new Promise((resolve, reject) => {
    if (n < 1) reject("Tham số n phải >= 1");
    const sortedStudents = students.sort((a, b) => a.cpa - b.cpa);
    const bottomN = sortedStudents.slice(0, n);
    resolve(
      `Top ${n} sinh viên có CPA thấp nhất là: \n` +
        bottomN.map((student) => student.mssv).join("\n")
    );
  });

  console.log(await result);
}

async function findCanhCao(students) {
  let result = new Promise((resolve) => {
    const warnings = students
      .map((student) => {
        let level = 0;
        if (student.cpa <= 0.5) {
          level = 3;
        } else if (student.cpa > 0.5 && student.cpa <= 1.0) {
          level = 2;
        } else if (student.cpa > 1.0 && student.cpa <= 1.5) {
          level = 1;
        }
        return level > 0 ? { mssv: student.mssv, level } : null;
      })
      .filter((warning) => warning !== null);
    resolve = () => {
			console.log("Những sinh viên đang bị cảnh cáo là:");
			console.log(warnings);
		}
		resolve();
  });

	console.log(await result);
}

module.exports = {
  findBottomN,
  findCanhCao,
};
