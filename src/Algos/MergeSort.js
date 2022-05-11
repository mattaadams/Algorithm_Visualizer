export function getMergeSortAnimations(array) {
  const animations = [];
  const tempArray = array.slice();
  doMerge(array, 0, array.length - 1, tempArray, animations);
  return animations;
}

function doMerge(mainArray, startIdx, endIdx, tempArray, animations) {
  if (startIdx === endIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  doMerge(tempArray, startIdx, midIdx, mainArray, animations);
  doMerge(tempArray, midIdx + 1, endIdx, mainArray, animations);
  Merge(mainArray, startIdx, midIdx, endIdx, tempArray, animations);
}

function Merge(mainArray, startIdx, midIdx, endIdx, tempArray, animations) {
  let i = startIdx;
  let j = midIdx + 1;
  let k = startIdx;

  while (i <= midIdx && j <= endIdx) {
    animations.push([1, i, j], [2, i, j]); //change then revert color
    if (tempArray[i] <= tempArray[j]) {
      animations.push([6, k, tempArray[i]]); //overwrite index value
      mainArray[k++] = tempArray[i++];
    } else {
      animations.push([6, k, tempArray[j]]); //overwrite index value
      mainArray[k++] = tempArray[j++];
    }
  }
  while (i <= midIdx) {
    animations.push([1, i, i], [2, i, i]); //change then revert color
    animations.push([6, k, tempArray[i]]); //overwrite index value
    mainArray[k++] = tempArray[i++];
  }
  while (j <= endIdx) {
    animations.push([1, j, j], [2, j, j]); //change then revert color
    animations.push([6, k, tempArray[j]]); //overwrite index value
    mainArray[k++] = tempArray[j++];
  }
}
