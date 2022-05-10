export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doSelection(array, animations);
  return animations;
}

function doSelection(array, animations) {
  let n = array.length;

  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([1, min, j]);
      animations.push([2, min, j]);
      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (min !== i) {
      // Swapping the elements if needed
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      animations.push([3, min, array[min], i, array[i]]); // index values swapped
    }
  }
}
