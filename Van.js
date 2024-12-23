async function cntBtwn(a, b, data) {
  a = parseFloat(a);
  b = parseFloat(b);

  // check xem a, b có là số chưa:
  if (typeof a !== "number" || typeof b !== "number") {
    return "Cận dưới hoặc trên chưa là giá trị số!";
  }

  let soLuong = new Promise((resolve) => {
    let n = data.length;
    let count = 0;

    // setTimeout(() => {
      for (let i = 0; i < n; i++) {
        if (data[i].cpa >= a && data[i].cpa <= b) {
          count++;
        }
      }

      resolve(count);
    // }, 10000);
  });

  console.log("Chương trình đang chạy...");

  console.log(
    "Số lượng sinh viên có CPA nằm trong đoạn [" +
      a +
      "; " +
      b +
      "] là: " +
      (await soLuong) +
      "."
  );
}

function cntSuspnd(data) {
  let thisYear = new Date().getFullYear();
  let nhapHoc;
  let n = data.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    nhapHoc = parseInt(data[i].mssv.toString().substring(0, 4));
    if (thisYear - nhapHoc > 5) {
      count++;
    }
  }

  return count;
}

module.exports = {
  cntBtwn,
  cntSuspnd,
};
