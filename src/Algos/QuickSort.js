export function getQuickSortAnimations(array) {
  const animations = [];
  doQuick(array, 0, array.length - 1, animations);
  return animations;
}

function doQuick(array, low, high, animations) {
  if (low < high) {
    // partIndex is partitioning index, array[p]
    // is now at right place
    let partIndex = partition(array, low, high, animations);

    // Separately sort elements before
    // partition and after partition
    doQuick(array, low, partIndex - 1, animations);
    doQuick(array, partIndex + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  // pivot

  let pivot = array[high];
  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    if (array[j] < pivot) {
      // Increment index of
      // smaller element

      i++;

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      animations.push([4, high], [5, high]);
      animations.push([1, i, j], [2, i, j]);
      animations.push([3, j, array[j], i, array[i]]);
    }
  }
  let temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  animations.push([1, i + 1, high], [2, i + 1, high]);
  animations.push([3, high, array[high], i + 1, array[i + 1]]);

  return i + 1;
}
