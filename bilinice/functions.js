'use strict'

//
// Function to conver objet dateJS to string for set value of data-time field
//
function dateJsObj_2_DateTimeFieldString(date) {

    if (!date) return dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(date).format('HH') + ":" + dayjs(date).format('mm');

    return dayjs(date1).format('YYYY-MM-DD') + "T" + dayjs(date1).format('HH') + ":" + dayjs(date1).format('mm');

};

//
// Function to convert siero bilirubin value from mmol/dl to mg/dl
//
// function mmol2mgdl(ar: IAxisRenderer, strCMs: String): String {
//     // var n: NumberFormatter = new NumberFormatter();
//     // n.precision = 1
//     // return n.format((Number(strCMs) / Nomogram.MMOL2MGDL).toString());
//     return "pippo";
// };

//
// Function to calc the value of the graph and the teraphy needed 
//
function getValue(ageGest, hourBirthExam) {
    // console.log("Parametro ageGest ricevuto = " + ageGest);
    // valuo of curves exept for gestional age 38
    // first  -> y value for first point lower curve (x = 0)
    // second -> y value for first point upper curve (x = 0)
    // third  -> y value for second point lower curve (x = 3)
    // fourth -> y value for second point upper curve (x = 3)
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

    let arrVal = [];      // value of y for lower and upper straight line at specific hour Birth-Exam

    if (ageGest == 38) {
        arrVal = getValue38eg(hourBirthExam); // specific calc for 38 gestiona age
    } else {
        // const val = pointVal[ageGest.toString()];
        const val = pointVal[ageGest.toString()]
        console.log("array val = " + val);
        console.log("Gest. Age = " + ageGest);
        console.log("pointVal[23] = " + pointVal[23]);
        console.log("pointVal[ageGest] = " + pointVal[ageGest]);

        // calc (geometrically) of the y value for lower and upper straight line at specific hour Birth-Exam
        // derive from: cal the equation of straight line passing for two points, then calc the y value
        // for the x point lay on that straight line 
        // these straight lines has one of the know point on the y axis (x = 0) 

        if (hourBirthExam <= 72) {
            // the first part of the curves is a straigth line oblique 
            arrVal[0] = ((Number(val[2]) - Number(val[0])) / 72) * hourBirthExam + Number(val[0]);
            arrVal[1] = ((Number(val[3]) - Number(val[1])) / 72) * hourBirthExam + Number(val[1]);
        } else {
            // the second part of the curves is a straigth line orizzontal
            arrVal[0] = Number(val[2]); 
            arrVal[1] = Number(val[3]);
        }
    }

    return arrVal;
};

//
// The lowe curve at gestional age = 38 has 3 straight line part: first two are oblique and the third is orizzontal
//
function getValue38eg(hourBirthExam) {

    const arrVal = [];
    // lower curve with 3 straight line parts
    if (hourBirthExam <= 24) {
        arrVal[0] = (((200 - 100) / 24) * hourBirthExam + 1) + 100;
    } else if (hourBirthExam < 96) {
        arrVal[0] = (((350 - 200) / 72) * (hourBirthExam - 23)) + 200;
    } else if ((hourBirthExam >= 96) && (hourBirthExam <= 336)) {
        arrVal[0] = 350;
    }
    
    // upper  curve with 2 straight line parts
    if (hourBirthExam <= 42) {
        arrVal[1] = (((450 - 100) / 42) * hourBirthExam) + 100;
    } else if ((hourBirthExam > 42) && (hourBirthExam <= 336)) {
        arrVal[1] = 450;
    }

    return arrVal;
};