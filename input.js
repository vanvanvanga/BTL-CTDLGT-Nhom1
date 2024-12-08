const fs = require("fs");

class Student {
  constructor(mssv, ten, cpa, canhCao) {
    this.mssv = mssv,
    this.ten = ten,
    this.cpa = cpa,
    this.canhCao = canhCao
  }
}

function add(cmd, data) {
  let mssv = parseInt(cmd[3]),
  ten = cmd[4],
  cpa = parseFloat(cmd[5]),
  canhCao = parseInt(cmd[6]);

  if (mssv.length !== 8) {
    console.log("Loi: MSSV phai su dung 8 ki tu.");
    return;
  }

  if (cpa < 0 || cpa > 4.0) {
    console.log("Loi: CPA phai nam trong khoang [0.0; 4.0].");
    return;
  }

  if (canhCao < 0 || canhCao > 3) {
    console.log("Loi: Muc canh cao chi co the la 0, 1, 2 hoac 3.");
    return;
  }

  let student = new Student(mssv, ten, cpa, canhCao);
  data.push(student);
  save(data);
}

function rnd(lim, type) {
  if (type === '-f') {
    return (Math.random() * lim).toFixed(2);
  }

  if (type === '-i') {
    return Math.floor(Math.random() * lim);
  }
}

let ho = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Phạm",
  "Hoàng",
  "Vũ",
  "Phan",
  "Trương",
  "Bùi",
  "Đặng",
  "Đỗ",
  "Ngô",
  "Hồ",
  "Dương",
  "Đinh",
  "Trịnh",
  "Huỳnh",
  "Võ",
]; // ho.length = 18
let tenRieng = [
  "Huy ",
  "Khang",
  "Bảo",
  "Minh",
  "Phúc",
  "Anh",
  "Khoa",
  "Phát",
  "Đạt",
  "Khôi",
  "Long",
  "Nam",
  "Duy",
  "Quân",
  "Kiệt",
  "Thịnh",
  "Tuấn",
  "Hưng",
  "Hoàng",
  "Hiếu",
  "Nhân",
  "Trí",
  "Tài",
  "Phong",
  "Hưng",
  "Vy",
  "Ngọc",
  "Nhi",
  "Hân",
  "Thư",
  "Linh",
  "Như",
  "Ngân",
  "Phương",
  "Thảo",
  "My",
  "Trân",
  "Quỳnh",
  "Nghi",
  "Trang",
  "Trâm",
  "An",
  "Thy",
  "Châu",
  "Trúc",
  "Uyên",
  "Yến",
  "Ý",
  "Tiên",
  "Thy",
]; // ten.length = 50
let years = [];
for (let i = 0; i < 10; i++) {
  years[i] = i * 10000 + 20150000;
}

// for funsies only
function addRand(number, data) {
  let start = data.length > 0 ? parseInt((data.at(-1).mssv).toString().substring(4, 8)) : 0;

  for (let i = 0; i < number; i++) {
    let mssv = years[rnd(10, '-i')] + ++start,
      ten = ho[rnd(18, '-i')] +
      " " +
      tenRieng[rnd(50, '-i')],
      cpa = parseFloat(rnd(4, '-f')),
      canhCao;

    // mức 3 cpa <= 0.5, mức 2: 0.5< cpa <= 1.0, mức 1: 1.0 < cpa <= 1.5
    if (cpa <= 0.5) {
      canhCao = 3;
    } else if (cpa <= 1.0) {
      canhCao = 2;
    } else if (cpa <= 1.5) {
      canhCao = 1;
    } else {
      canhCao = 0;
    }

      let student = new Student(mssv, ten, cpa, canhCao);
      data.push(student);
  }
  save(data);
}

function save(data) {
  let text = JSON.stringify(data, null, 2); // 2 pretty prints JSON file. see https://stackoverflow.com/a/7220510
  fs.writeFile("data.json", text, (err) => {
    console.log(err ? err : "File saved successfully!");
  });
}

module.exports = {
  add,
  addRand,
}; // xuất các hàm này để dùng ở file khác
