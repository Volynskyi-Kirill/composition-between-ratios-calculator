import { R1, R2 } from './constants.mjs';

function composition(R1, R2) {
  const result = [];

  R1.forEach(([a, b1]) => {
    R2.forEach(([b2, c]) => {
      if (b1 === b2) {
        result.push([a, c]);
      }
    });
  });

  result.sort((x, y) => {
    if (x[0] === y[0]) {
      return x[1] > y[1] ? 1 : -1;
    }
    return x[0] > y[0] ? 1 : -1;
  });

  return result;
}

function union(R1, R2) {
  const combined = [...R1, ...R2];

  const uniquePairs = combined.filter(
    (pair, index, self) =>
      index === self.findIndex((p) => p[0] === pair[0] && p[1] === pair[1])
  );

  uniquePairs.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] > b[1] ? 1 : -1;
    }
    return a[0] > b[0] ? 1 : -1;
  });

  return uniquePairs;
}

function intersection(R1, R2) {
  return R1.filter((pair1) =>
    R2.some((pair2) => pair1[0] === pair2[0] && pair1[1] === pair2[1])
  );
}

function formatResult(actionName, name1, name2, result) {
  const formattedPairs = result.map(([a, b]) => `(${a}, ${b})`).join(', ');
  return `${name1} ${actionName} ${name2} = {${formattedPairs}}`;
}

function relationMatrix(relations) {
  const elements = Array.from(new Set(relations.flat())).sort();

  const matrix = Array.from({ length: elements.length }, () =>
    Array(elements.length).fill(0)
  );

  relations.forEach(([a, b]) => {
    const rowIndex = elements.indexOf(a);
    const colIndex = elements.indexOf(b);
    if (rowIndex !== -1 && colIndex !== -1) {
      matrix[rowIndex][colIndex] = 1;
    }
  });

  return { elements, matrix };
}

const compositionR1R2 = composition(R1, R2);
const compositionR2R1 = composition(R2, R1);
const resultUnion = union(R1, R2);
const resultIntersection = intersection(R1, R2);

console.log(formatResult('∪', 'R1', 'R2', resultUnion));
console.log(formatResult('∩', 'R1', 'R2', resultIntersection));
console.log(formatResult('°', 'R1', 'R2', compositionR1R2));
console.log(formatResult('°', 'R2', 'R1', compositionR2R1));

const { elements: unionElements, matrix: unionMatrix } =
  relationMatrix(resultUnion);
const { elements: intersectionElements, matrix: intersectionMatrix } =
  relationMatrix(resultIntersection);
const { elements: compositionR1R2Elements, matrix: compositionR1R2Matrix } =
  relationMatrix(compositionR1R2);
const { elements: compositionR2R1Elements, matrix: compositionR2R1Matrix } =
  relationMatrix(compositionR2R1);

function printMatrix(title, elements, matrix) {
  console.log(`${title}:`);
  console.log(' ', elements.join('  '));
  matrix.forEach((row, index) => {
    console.log(elements[index], row.join('  '));
  });
}

printMatrix('Relation Matrix for Union', unionElements, unionMatrix);
printMatrix(
  'Relation Matrix for Intersection',
  intersectionElements,
  intersectionMatrix
);
printMatrix(
  'Relation Matrix for Composition R1°R2',
  compositionR1R2Elements,
  compositionR1R2Matrix
);
printMatrix(
  'Relation Matrix for Composition R2°R1',
  compositionR2R1Elements,
  compositionR2R1Matrix
);
