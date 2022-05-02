function disGraf () {
    
    var T = [5, -2, 4, 3, 6, 8, 7, -4, -8, 7, 6]; //Dati

    var i, h;                         // indice e ?
    var step = (CNV.width / (T.length - 1)) - 10; //distanza tra i punti
    var pos = 0;                       // valore iniziale del punto  

    // alert("siamo arrivati qui!") ;


    var x0 = 10;                       // offset X per inizio del grafico
    var y0 = CNV.height / 2;             // offset Y per inizio del grafico: centrato sulla metà del canvas
    var L = step * (T.length - 1);          // distanza tra i punti

    // determina il valore massimo del grafico
    var max = Math.abs(T[0]);
    for (i = 0; i < T.length; i++)
        if (Math.abs(T[i]) > max)
            max = Math.abs(T[i]);

    var sc = (CNV.height / 2 - 20) / max;       // calcola la scala veticale: (altezza del canvas/2 
    // meno spazio sopra e sotto)/ valore massimo

    var sc_orr = (CNV.width - 20 / T.length); // calcola la scala orizzontale: (larghezza del canvas 
    // meno spazio sopra e sotto)/ valore massimo                                    

    var ctx = CNV.getContext("2d");
    ctx.font = "10px Arial";

    //----------------tracciamento asse x
    var x0asse = 0
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(x0asse, y0);
    ctx.lineTo(x0asse + CNV.width, y0);
    ctx.stroke();

    //----------------tracciamento asse y
    var xOffsetAsse = 10
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