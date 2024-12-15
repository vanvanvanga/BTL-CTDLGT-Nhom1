// Thay đổi CPA của sinh viên
function modifyCpa(mssv, newCpa, data) {
  //Search SV = MSSV
  const student = data.find((sv) => sv.mssv === mssv);
  if (!student) {
    return `Không tìm thấy sinh viên có MSSV ${mssv}.`;
  }

  // Kiểm tra giá trị CPA mới
  if (typeof newCpa !== "number" || newCpa < 0 || newCpa > 4) {
    return `CPA mới không hợp lệ. Vui lòng nhập số từ 0 đến 4.`;
  }

  // Cập nhật CPA
  student.cpa = newCpa;
  return `Cập nhật CPA cho sinh viên ${mssv} thành công. CPA mới: ${newCpa}`;
}

// Tìm n sinh viên có CPA cao nhất
function findTop(n, data) {
  if (typeof n !== "number" || n < 1) {
    return `Số lượng cần tìm không hợp lệ. Vui lòng nhập số nguyên >= 1.`;
  }

  // Sắp xếp danh sách theo CPA từ cao xuống thấp
  const sortedData = [...data].sort((a, b) => b.cpa - a.cpa);

  // Lấy n sinh viên đầu tiên
  const topStudents = sortedData.slice(0, n);

  // Trả về danh sách MSSV
  return topStudents.map((sv) => sv.mssv).join("\n");
}

module.exports = {
  modifyCpa,
  findTop,
};
