'use strict'

function disGraf() {

    // leggere i parametri dall'Url
    // ?lang=IT
    //paznome=SELEN&pazcogn=PELLETTERI
    //&pazdnas=202205021321&pazeg=35&examumis=mg%2fdl
    //&lang=IT

    // leggere la stringa incluso il ?
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);

    //ricava parametri specifici con "urlParams.get"
    const lang = urlParams.get('lang'); console.log(lang);
    const pazCognome = urlParams.get('pazcogn'); console.log(pazCognome);
    const pazNome = urlParams.get('paznome'); console.log(pazNome);
    const pazDataNasc = urlParams.get('pazdnas'); console.log(pazDataNasc);
    const pazEtaGest = urlParams.get('pazeg'); console.log(pazEtaGest);
    const esameUnitMis = urlParams.get('examumis'); console.log(esameUnitMis);

    // controlla se un parametro è pieno o vuoto: se newUser è vuota vale false
    // ATTENZIONE se non c'è è come se fosse vuoto
    const newUser = urlParams.get('newuser'); console.log(newUser ? "piena" : "vuota");

    // controlla se il parametro è presente "urlParams.has"
    console.log("il parametro newuser è prenente: " + urlParams.has('newuser'));
    console.log("il parametro urlParams è prenente: " + urlParams.has('paymentmethod'));

    // ottenere tutti i valori di un parametro
    console.log("size prima dell'append da codice: " + urlParams.getAll('size')); // [ 'm' ]
    urlParams.append('size dopo', 'xl'); //Programmatically add a second size parameter.
    console.log("size: " + urlParams.getAll('size')); // [ 'm', 'xl' ]

    console.log(urlParams.getAll('lang'))

    const parametri = queryString.split("&")
    console.log("Array parametri: "+parametri);

    document.getElementById("parametriUrl").innerHTML = "pluto";
    document.getElementById("parametriUrl").className = "visible";
    document.getElementById("parametriUrl2").innerHTML = queryString;

    const T = [5, -2, 4, 3, 6, 8, 7, -4, -8, 7, 6]; //Dati

    let i, h;                         // indice e ?
    const step = (CNV.width / (T.length - 1)) - 10; //distanza tra i punti
    let pos = 0;                       // valore iniziale del punto  

    // alert("siamo arrivati qui!") ;


    const x0 = 10;                       // offset X per inizio del grafico
    const y0 = CNV.height / 2;           // offset Y per inizio del grafico: centrato sulla metà del canvas
    var L = step * (T.length - 1);       // distanza tra i punti NON UTILIZZATA

    // determina il valore massimo del grafico
    let max = Math.abs(T[0]);
    for (i = 0; i < T.length; i++)
        if (Math.abs(T[i]) > max)
            max = Math.abs(T[i]);

    const sc = (CNV.height / 2 - 20) / max;       // calcola la scala veticale: (altezza del canvas/2 
    // meno spazio sopra e sotto)/ valore massimo

    const sc_orr = (CNV.width - 20 / T.length); // calcola la scala orizzontale: (larghezza del canvas 
    // meno spazio sopra e sotto)/ valore massimo                                    

    const ctx = CNV.getContext("2d");
    ctx.font = "10px Arial";

    //----------------tracciamento asse x
    const x0asse = 0
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(x0asse, y0);
    ctx.lineTo(x0asse + CNV.width, y0);
    ctx.stroke();
 
    //----------------tracciamento asse y
    const xOffsetAsse = 10
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(xOffsetAsse, 0);
    ctx.lineTo(xOffsetAsse, CNV.height);
    ctx.stroke();

    // tracciamento del primo punto del grafico
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(x0, y0 - T[0] * sc);

    // label del primo punto 
    ctx.fillText(T[0], x0 + 5, y0 - T[0] * sc);
    console.log('x0= ' + x0);

    // ciclo per tracciamento grafico e relative etichette
    for (i = 1; i < T.length; i++) {
        ctx.lineTo(pos + step, y0 - T[i] * sc);           // punto sucessivo
        ctx.fillText(T[i], pos + step, y0 - T[i] * sc +
            (T[i] > 0 ? -10 : +10));  //etichetta del valore
        ctx.stroke();                              // unisce i due punti con una linea
        pos = pos + step;

    }//fine for

    
}