'use strict'

const scores = [28, 25, 21, 30, 18, 24, 22];

console.log(scores.join(', '));

// find the minimun
let min_pos = 0
for (let i = 0; i < scores.length; i++) {
    if (scores[i] < scores[min_pos])
        min_pos = i;

}

console.log(scores[min_pos]);

console.log(scores.join(', '));