import { user } from "./constants";

function isNumeric(value) {
  return !Number.isNaN(Number(value));
}

function actionsStatusHome(name) {
  return `[![${name}](https://github.com/${user}/${name}/workflows/${name}/badge.svg)](https://github.com/${user}/${name})`;
}

function bubbleSort(inputArr) {
  const len = inputArr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i += 1) {
      if (inputArr[i][0] < inputArr[i + 1][0]) {
        const tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);
  return inputArr;
}

export { actionsStatusHome, bubbleSort, isNumeric };
