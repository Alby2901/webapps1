'use strict'

const scores = [28, 25, 21, 30, 18, 24, 22];

let avg = 0;
for (const x of scores) {
    avg += x;
}
avg = Math.round(avg/scores.length);


console.log('scores     = ' + scores.join(', '));
console.log('avg of score  = ' + avg);

const scores_new = [...scores];

console.log('scores_new = ' + scores_new.join(', '));

// find the first minimun
let min_pos = 0
for (let i = 0; i < scores_new.length; i++) {
    if (scores_new[i] < scores_new[min_pos])
        min_pos = i;
}

console.log('first score min to remove = ' + scores_new[min_pos]);

// eliminate the first min
scores_new.splice(min_pos,1);

console.log('scores_new = ' + scores_new.join(', '));

// find the second minimun
min_pos = 0
for (let i = 0; i < scores_new.length; i++) {
    if (scores_new[i] < scores_new[min_pos])
        min_pos = i;

}

console.log('second score min to remove = ' + scores_new[min_pos]);

// eliminate the socond min
scores_new.splice(min_pos,1);

console.log('scores_new = ' + scores_new.join(', '));

let avg_new = 0;
for (const x of scores_new) {
    avg_new += x;
}
avg_new = Math.round(avg_new/scores_new.length);

scores_new.push(avg_new);
scores_new.push(avg_new);

console.log('scores_new = ' + scores_new.join(', '));

avg_new = 0;
for (const x of scores_new) {
    avg_new += x;
}
avg_new = Math.round(avg_new/scores_new.length);

// console.log('scores_new            = ' + scores_new.join(', '));
console.log('avg_new of score_new  = ' + avg_new);