
const A = [1, 3, 2, 5, 4];

const maybeSetNull = (n, idx, array) => {
    const next = array[idx+1] || 0;
    return n < next ? null : n;
}

console.log(A.map(maybeSetNull));

