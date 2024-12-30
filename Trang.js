// Liệt kê danh sách sinh viên
function list(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return "Danh sách sinh viên trống.";
  }

  // Kết hợp MSSV và họ tên
  return data.map((sv) => `${sv.mssv} - ${sv.ten}`).join("\n");
}

// Tìm sinh viên theo MSSV
function find(mssv, data) {
    if (mssv) {
      const student = data.find((sv) => sv.mssv === parseInt(mssv));
      if (!student) {
        console.log(`Không tìm thấy sinh viên có MSSV ${mssv}.`);
      } else {console.log(`${student.mssv} "${student.ten}" ${student.cpa} ${student.canhCao}`);}
    } else {
      console.log("Vui lòng cung cấp MSSV để tìm kiếm.");
    }
  
}

module.exports = {
  list,
  find,
};
