export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doHeap(array, animations);
  return animations;
}

function doHeap(array, animations) {
  let n = array.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    animations.push([1, 0, i], [2, 0, i]);
    animations.push([3, i, array[i], 0, array[0]]);

    // call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

// To heapify a subtree rooted with node i which is
// an index in array[]. n is size of heap
function heapify(array, n, i, animations) {
  let largest = i; // root
  let l = 2 * i + 1; // left
  let r = 2 * i + 2; // right

  if (l < n && array[l] > array[largest]) {
    largest = l;
  }

  if (r < n && array[r] > array[largest]) {
    largest = r;
  }

  if (largest !== i) {
    let temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    animations.push([7, l, r, i], [8, l, r, i]);
    animations.push([3, largest, array[largest], i, array[i]]);

    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, animations);
  }
}
