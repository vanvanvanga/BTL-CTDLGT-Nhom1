const fs = require("fs");
const prompt = require("prompt-sync")();

class Student {
    constructor(mssv, cpa) {
        this.mssv = mssv;
        this.cpa = cpa;
    }
}

async function findBottomN(students, n) {
    if (n < 1) throw new Error("Parameter n must be >= 1");
    const sortedStudents = students.sort((a, b) => a.cpa - b.cpa);
    const bottomN = sortedStudents.slice(0, n);
    return bottomN.map(student => student.mssv).join("\n");
}

async function findCanhCao(students) {
    const warnings = students.map(student => {
        let level = 0;
        if (student.cpa <= 0.5) {
            level = 3;
        } else if (student.cpa > 0.5 && student.cpa <= 1.0) {
            level = 2;
        } else if (student.cpa > 1.0 && student.cpa <= 1.5) {
            level = 1;
        }
        return level > 0 ? { mssv: student.mssv, level } : null;
    }).filter(warning => warning !== null);
    return warnings;
}

(async () => {
    try {
        const data = fs.readFileSync("data.json", "utf8");
        const studentsData = JSON.parse(data);
        const students = studentsData.map(s => new Student(s.mssv, s.cpa));
        const input = prompt("Enter the number of students to display: ");
        const n = parseInt(input, 10);
        if (isNaN(n) || n < 1) throw new Error("Invalid input for n");
        const bottomN = await findBottomN(students, n);
        console.log("Bottom N students:\n" + bottomN);
        const warnings = await findCanhCao(students);
        console.log("Students under warning:", warnings);
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
