'use strict'

function greeter(name) {
    const myname = name;

    const hello = function () {
        return "Ciao " + myname;
    }
return hello;

}

const helloTom = greeter("Tom");
const helloJay = greeter("Jay");


console.log(helloTom());
console.log(helloJay());

console.log('Programma terminato');


