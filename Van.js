function cntBtwn(a, b, data) {
  // check xem a, b có là số chưa:
  if (typeof(a) !== "number" || typeof(b) !== "number") {
    return "Cận dưới hoặc trên chưa là giá trị số!";
  }

  let n = data.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (data[i].cpa >= a && data[i].cpa <= b) {
      count++;
    }
  }

  return count;
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
  cntSuspnd
};