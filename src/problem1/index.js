/* Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`. */

/* 1. Iterative solution */

var sum_to_n_a = function (n) {
  if (n < 0 || (n * (n + 1)) / 2 > Number.MAX_SAFE_INTEGER) {
    throw new Error('Input is out of bounds')
  }
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

/* 2. Recursive solution */

var sum_to_n_b = function (n) {
  if (n < 0 || (n * (n + 1)) / 2 > Number.MAX_SAFE_INTEGER) {
    throw new Error('Input is out of bounds')
  }
  if (n <= 1) {
    return n
  } else {
    return n + sum_to_n_b(n - 1)
  }
}

/* 3. Mathematical solution */

var sum_to_n_c = function (n) {
  if (n < 0 || (n * (n + 1)) / 2 > Number.MAX_SAFE_INTEGER) {
    throw new Error('Input is out of bounds')
  }
  return (n * (n + 1)) / 2
}

// Print results
console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))
