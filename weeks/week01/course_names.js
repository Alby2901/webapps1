'use strict'

const course_names = 'Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technologies and services, Information systems security, Software engineering, System and device programming' ;

console.log(course_names);

const course_names_array = course_names.split(',');

console.log(course_names_array);

// for (let x of course_names_array) {
//     x = x.trim();
// }

for(let i=0; i<course_names_array.length; i++) {
    course_names_array[i] = course_names_array[i].trim();
}

const acronimi = [];

for (const x of course_names_array) {
    
    // let acronimo = x[0];
    // const indice_spazio = x.indexOf(' ');
    // acronimo += x[indice_spazio+1].toUpperCase();
    // console.log(acronimo);    
    // acronimi.push(acronimo);
    // acronimi.push((x[0]+x[x.indexOf(' ')+1]).toUpperCase());
    
    const course_name_array = x.split(' ');
    console.log(course_name_array);
    let acronimo = '';  
    for (const word of course_name_array) {
        if (word.toLowerCase() !== 'and') {
            acronimo += word[0].toUpperCase();
            console.log(acronimo);
        }
    }
    acronimi.push(acronimo);
}
console.log(course_names_array);

const course_names_array_sorted = course_names_array.sort();
const acronimi_sorted = acronimi.sort();

console.log(course_names_array_sorted);
console.log(acronimi_sorted.sort());

for (let i=0; i<acronimi_sorted.length;i++) {
    console.log(acronimi_sorted[i] + ' - ' + course_names_array_sorted[i]);
}