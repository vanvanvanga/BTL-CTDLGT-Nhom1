// Quick sort
// start, end, pivot here all refer to indices/locations
function partition(arr, start, end, opt) {
  // move pivotValue to correct place and return said correct place
  let pivotValue = arr[end].cpa;
  let j = start,
    i = j - 1;
  let temp;

  function swap(arr, i, j) {
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  switch (opt) {
    case "asc":
      for (; j < end; j++) {
        if (arr[j].cpa < pivotValue) {
          i++;
          swap(arr, i, j);
        }
      }
      break;

    case "desc":
      for (; j < end; j++) {
        if (arr[j].cpa > pivotValue) {
          i++;
          swap(arr, i, j);
        }
      }
      break;

    default:
      console.log("Error occurred: type of sorting missing or incorrect");
      break;
  }

  i++;
  swap(arr, i, j);

  return i;
}

function quickSort(arr, start, end, opt) {
  // Base case
  if (end <= start) {
    return;
  }

  let pivot = partition(arr, start, end, opt);
  quickSort(arr, start, pivot - 1, opt);
  quickSort(arr, pivot + 1, end, opt);
}

function sort(arr, opt) {
  // console.log(arr);
  let end = arr.length - 1;
  quickSort(arr, 0, end, opt);
  // console.log(arr);
}

module.exports = {
  sort
};
