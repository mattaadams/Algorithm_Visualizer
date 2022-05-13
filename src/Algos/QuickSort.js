export function getQuickSortAnimations(array) {
  const animations = [];
  doQuick(array, 0, array.length - 1, animations);
  return animations;
}

//L+R Quicksort

function doQuick(array, start, end, animations) {
  if (start >= end) {
    return;
  }
  let pivot = start,
    i = start + 1,
    j = end;

  while (j >= i) {
    if (array[j] < array[pivot] && array[i] > array[pivot]) {
      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;
      animations.push([1, i, j], [2, i, j]);
      animations.push([4, pivot]);
      animations.push([3, i, array[i], j, array[j]]);
    }
    if (array[j] >= array[pivot]) {
      j--;
      animations.push([1, i, j], [2, i, j]);
    }
    if (array[i] <= array[pivot]) {
      i++;
      animations.push([1, i, j], [2, i, j]);
    }
    if (j >= i) {
      animations.push([1, i, j], [2, i, j]);
    }
  }
  if (pivot !== j) {
    let temp = array[j];
    array[j] = array[pivot];
    array[pivot] = temp;
    animations.push([1, pivot, j], [2, pivot, j]);
    animations.push([3, pivot, array[pivot], j, array[j]]);
  }
  doQuick(array, start, j - 1, animations);
  doQuick(array, j + 1, end, animations);
}

// function partition(array, low, high, animations) {
//   // pivot

//   let pivot = array[high];
//   // Index of smaller element and
//   // indicates the j position
//   // of pivot found so far
//   let i = low - 1;

//   for (let j = low; j <= high - 1; j++) {
//     // If current element is smaller
//     // than the pivot
//     animations.push([1, i, j], [2, i, j]);
//     animations.push([3, j, array[j], i, array[i]]);
//     if (array[j] < pivot) {
//       // Increment index of
//       // smaller element

//       i++;

//       let temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;
//       animations.push([4, high]); //, [5, high]);
//     }
//   }
//   let temp = array[i + 1];
//   array[i + 1] = array[high];
//   array[high] = temp;
//   animations.push([1, i + 1, high], [2, i + 1, high]);
//   animations.push([3, high, array[high], i + 1, array[i + 1]]);

//   return i + 1;
// }
