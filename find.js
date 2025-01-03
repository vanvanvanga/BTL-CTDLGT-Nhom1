function lookForMSSV (array, key) {
  let n = array.length;
  let found = undefined;

  for (let i = 0; i < n; i++) {
    if (array[i].mssv === parseInt(key)) {
      found = array[i];
    }  
  }

  return found;
}

module.exports = {
  lookForMSSV
}