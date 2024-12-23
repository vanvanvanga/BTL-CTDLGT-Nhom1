// Liệt kê danh sách sinh viên
function list(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return "Danh sách sinh viên trống.";
  }

  // Kết hợp MSSV và họ tên
  return data
    .map((sv) => `${sv.mssv} - ${sv.ten}`)
    .join("\n");
}

// Tìm sinh viên theo MSSV
function find(mssv, data) {
  const student = data.find((sv) => sv.mssv === parseInt(mssv));
  if (!student) {
    return `Không tìm thấy sinh viên có MSSV ${mssv}.`;
  }

  return `${student.mssv} "${student.ten}" ${student.cpa} ${student.canhCao}`;
}

module.exports = {
  list,
  find
};
