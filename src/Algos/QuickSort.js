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
  animations.push([0, pivot, pivot]);
  while (j >= i) {
    if (array[j] < array[pivot] && array[i] > array[pivot]) {
      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;
      animations.push([3, i, array[i], j, array[j]]);
    }
    if (array[j] >= array[pivot]) {
      j--;
    }
    if (array[i] <= array[pivot]) {
      i++;
    }
    if (j >= i) {
      animations.push([1, i, j], [2, i, j]);
    }
  }
  //animations.push([5, pivot]);

  if (pivot !== j) {
    let temp = array[j];
    array[j] = array[pivot];
    array[pivot] = temp;
    animations.push([3, pivot, array[pivot], j, array[j]]);
  }
  animations.push([2, pivot, pivot]);
  doQuick(array, start, j - 1, animations);
  doQuick(array, j + 1, end, animations);
}
