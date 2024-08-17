function diagonalDifference(matrix) {
    const n = matrix.length;
    let DiagonalSumpertama = 0;
    let DiagonalSumkedua = 0;

    for (let i = 0; i < n; i++) {
        DiagonalSumpertama += matrix[i][i];
        DiagonalSumkedua += matrix[i][n - 1 - i];
    }

    return DiagonalSumpertama - DiagonalSumkedua;
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

const result = diagonalDifference(matrix);
console.log(result);
