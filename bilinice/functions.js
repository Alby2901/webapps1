'use strict'

//
// Function to conver objet dateJS to string for set value of data-time field
//
function dateJsObj_2_DateTimeFieldString(date) {

    if (!date) return dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(date).format('HH') + ":" + dayjs(date).format('mm');

    return dayjs(date1).format('YYYY-MM-DD') + "T" + dayjs(date1).format('HH') + ":" + dayjs(date1).format('mm');

};

//
// Function to calc the value of the graph and the teraphy needed 
//

function getValue(ageGest, hourBirthExam) {

    console.log("Parametro ageGest ricevuto = " + ageGest);
    const pointVal = [];
    pointVal[23] = ["40", "80", "130", "230"];
    pointVal[24] = ["40", "80", "140", "240"];
    pointVal[25] = ["40", "80", "150", "250"];
    pointVal[26] = ["40", "80", "160", "260"];
    pointVal[27] = ["40", "80", "170", "270"];
    pointVal[28] = ["40", "80", "180", "280"];
    pointVal[29] = ["40", "80", "190", "290"];
    pointVal[30] = ["40", "80", "200", "300"];
    pointVal[31] = ["40", "80", "210", "310"];
    pointVal[32] = ["40", "80", "220", "320"];
    pointVal[33] = ["40", "80", "230", "330"];
    pointVal[34] = ["40", "80", "240", "340"];
    pointVal[35] = ["40", "80", "250", "350"];
    pointVal[36] = ["40", "80", "260", "360"];
    pointVal[37] = ["40", "80", "270", "370"];

    const arrVal = [];

    if (ageGest == 38) {
        arrVal = getValue38eg(hourBirthExam);
        // }else{
        //     var val:Array = values[eg.toString()];
        //     //var arrVal:Array = new Number[2];
        //     if (hLife <= 72) {
        //         arrVal[0] = ((Number(val[2]) - Number(val[0])) / 72)
        //             * hLife
        //             + Number(val[0]);
        //         arrVal[1] = ((Number(val[3]) - Number(val[1])) / 72)
        //             * hLife
        //             + Number(val[1]);
        //     } else {

    } else {
        // const val = pointVal[ageGest.toString()];
        const val = [1,2,3,4];
        console.log("array val = " + val);
        console.log("Gest. Age = " + ageGest);
        console.log("pointVal[23] = " + pointVal[23]);
        console.log("pointVal[ageGest] = " + pointVal[ageGest]);
        

        // if (hourBirthExam <= 72) {
        //     arrVal[0] = ((Number(val[2]) - Number(val[0])) / 72) * hourBirthExam + Number(val[0]);
        //     arrVal[1] = ((Number(val[3]) - Number(val[1])) / 72) * hourBirthExam + Number(val[1]);
        // } else {
        //     arrVal[0] = Number(val[2]);
        //     arrVal[1] = Number(val[3]);
        //}
    }

    // return arrVal;
    return "Pippo";

};


function getValue38eg(hLife) {

    console.log(hLife);

};