const R1 = [
  [1, 1],
  [1, 5],
  [5, 1],
  [5, 5],
  [5, 7],
  [7, 5],
  [7, 7],
];

const R2 = [
  [1, 1],
  [3, 3],
  [3, 5],
  [5, 3],
  [5, 5],
  [7, 7],
];

function composition(R1, R2) {
  const result = [];

  R1.forEach(([a, b1]) => {
    R2.forEach(([b2, c]) => {
      if (b1 === b2) {
        result.push([a, c]);
      }
    });
  });

  return result;
}

function formatComposition(name1, name2, result) {
	const formattedPairs = result.map(([a, b]) => `(${a}, ${b})`).join(", ");
	
	return `${name1} ° ${name2} = {${formattedPairs}}`;
  }

const R1FromR2 = composition(R1, R2);

const R2FromR1 = composition(R2, R1);

console.log('R1FromR2: ', R1FromR2);
console.log('R2FromR1: ', R2FromR1);

console.log(formatComposition("R1", "R2", R1FromR2));
console.log(formatComposition("R2", "R1", R2FromR1));

