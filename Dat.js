const fs = require("fs");
const prompt = require("prompt-sync")();

class Student {
    constructor(mssv, cpa) {
        this.mssv = mssv;
        this.cpa = cpa;
    }
}

async function modifyCpa(students, mssv, newCpa) {
    if (typeof newCpa !== "number" || newCpa < 0 || newCpa > 4) {
        throw new Error("Invalid CPA value. Please enter a number between 0 and 4.");
    }

    const student = students.find(student => student.mssv === mssv);
    if (!student) {
        throw new Error(`Student with MSSV ${mssv} not found.`);
    }

    student.cpa = newCpa;
    return `Updated CPA for student ${mssv} to ${newCpa}.`;
}

async function findTopN(students, n) {
    if (n < 1) throw new Error("Parameter n must be >= 1");

    const sortedStudents = students.sort((a, b) => b.cpa - a.cpa);
    const topN = sortedStudents.slice(0, n);
    return topN.map(student => student.mssv).join("\n");
}

(async () => {
    try {
        const data = fs.readFileSync("data.json", "utf8");
        const studentsData = JSON.parse(data);
        const students = studentsData.map(s => new Student(s.mssv, s.cpa));

        const command = prompt("Enter command (modify or findtop): ");

        if (command === "modify") {
            const mssv = prompt("Enter MSSV: ");
            const newCpaInput = prompt("Enter new CPA: ");
            const newCpa = parseFloat(newCpaInput);
            if (isNaN(newCpa)) throw new Error("Invalid CPA value.");

            const result = await modifyCpa(students, mssv, newCpa);
            console.log(result);
        } else if (command === "findtop") {
            const input = prompt("Enter the number of students to display: ");
            const n = parseInt(input, 10);
            if (isNaN(n) || n < 1) throw new Error("Invalid input for n.");

            const topN = await findTopN(students, n);
            console.log("Top N students:\n" + topN);
        } else {
            console.log("Invalid command.");
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
