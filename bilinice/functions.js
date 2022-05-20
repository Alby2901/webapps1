'use strict'

//----------------------------------------------
// Function to conver objet dateJS to string for set value of data-time field: "YYYY-MM-DDTHH:MM" -> example: "2022-05-20T20:58"
// date is a dayJS object
// If date is empty return the string of current date
//
function dateJsObj_2_DateTimeFieldString(date) {

    // "if" is NOT NECESSARY
    //if (!date) return dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(date).format('HH') + ":" + dayjs(date).format('mm');
    
    return dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(date).format('HH') + ":" + dayjs(date).format('mm');

};

// --------------------------------------------
// Calc n. hours from birth date and exam date
// 
// stringDate -> date in string format: "YYYYMMGGHHMM"
// objDatejs  -> date in obj dayJS format
// 
function calcHourBirthExam(stringDate, objDatejs) {
    const date1 = dayjs(stringDate, "YYYYMMDDmmss")                     // convert date in dayJS obj
    const date2 = dayjs(objDatejs);                                     // convert date in dayJS obj (may not necessary)
    // const dt1Dt2Diff = date2.diff(date1, 'day', true)                // calculate date diff in days (float)
    // const diffDay = Math.round(dt1Dt2Diff);                          // calculate date diff in days (round)
    const hourBirthExam = Math.round(date2.diff(date1, 'hour', true));  // calculate hours diff in hours (float then round)
    return hourBirthExam
};

//---------------------------------------------
// calc diffDayHour to show in corrispondent field "<days>d <hours>h" --> <trunc(diffDay)> d <round(diffDay - trunc(diffDay)) * 24> h
//
// date1 = data in string format yyyymmddhhmm 
// date2 = dayjs() obj
//
function calcDiffDayHour(date1, date2) {

    // console.log("DataOdierna= " + dayjs());
    const date1temp = dayjs(date1, "YYYYMMDDmmss");
    const date2temp = dayjs(date2);
    const diffDayFloat = date2temp.diff(date1temp, 'day', true);
    const diffDaytrunc = date2temp.diff(date1temp, 'day', false);
    const diffDayDecimalPart = diffDayFloat - diffDaytrunc;
    const hourRoundOfDiffDaysDecimalPart = Math.round(diffDayDecimalPart * 24);
    const diffDayHour = diffDaytrunc + "d " + hourRoundOfDiffDaysDecimalPart + "h";
    return diffDayHour;

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

//----------------------------------------------
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
    const val = pointVal[ageGest.toString()];
    const result = [];

    if (ageGest == 38) {
        arrVal = getValue38eg(hourBirthExam); // specific calc for 38 gestiona age
    } else {
        // const val = pointVal[ageGest.toString()];

        // console.log("array val = " + val);
        // console.log("Gest. Age = " + ageGest);
        // console.log("pointVal[23] = " + pointVal[23]);
        // console.log("pointVal[ageGest] = " + pointVal[ageGest]);

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

    // result = val.concat(arrVal);
    // console.log("result= " + result);
    return val.concat(arrVal);
};

//----------------------------------------------
// The lower curve at gestional age = 38 has 3 straight line part: first two are oblique and the third is orizzontal
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

//----------------------------------------------
// Funcion to draw draph with EGraphs library
//
function drawGraphic(dataLinesGraph, hourAfterBirth, totalSerumBili) {
    const data = dataLinesGraph;
    const dayAfterBirth = Math.round(hourAfterBirth / 24 * 100) / 100;

    // console.log('data = ' + data);
    // console.log('hourAfterBirth = ' + hourAfterBirth);
    // console.log('dayAfterBirth= ' + dayAfterBirth);

    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        // title: {
        //   text: 'grafico bilirubina nice'
        // },
        xAxis: {
            // data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

            minorTick: {
                show: true
            },
            name: 'Day of Life',
            nameLocation: 'middle',
            vertticalAlign: 'bottom',
            nameTextStyle: {
                fontWeight: 'bold',
                // verticalAlign: 'bottom'   
            },
            interval: 1
        },
        yAxis: {},
        series: [
            {
                data: [
                    [0, data[0]],
                    [3, data[2]],
                    [14, data[2]]
                ],
                showSymbol: false,
                type: 'line',
                color: 'blue',
            },
            {
                data: [
                    [0, data[1]],
                    [3, data[3]],
                    [14, data[3]]
                ],
                showSymbol: false,
                type: 'line',
                color: 'red',
            },
            {
                data: [
                    [dayAfterBirth, data[4]]
                ],
                type: 'scatter',
                color: 'blue',
            },
            {
                data: [
                    [dayAfterBirth, data[5]]
                ],
                type: 'scatter',
                color: 'red',
            },
            {
                data: [
                    [dayAfterBirth, totalSerumBili]
                ],
                type: 'scatter',
                color: 'green',
            },

        ]
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
};

//----------------------------------------------
//  functio to simulate and chack function call
//
function calcolaValori() {
    // console.log('Siamo in "calcola valori"'); alert('Siamo in "calcola valori"');
    const date1 = document.getElementById('DayTimeofBirth').value
    const date2 = document.getElementById('DayTimeofExam').value
    console.log('date1 in calc val= ' + date1);
    console.log('date1 in calc val= ' + date1);
    document.getElementById('hourAfterBirth').value = calcHourBirthExam(date1, date2);
    document.getElementById('dayHourAfterBirth').value = calcDiffDayHour(date1, date2);

};

//----------------------------------------------
//  function calc numeric result
//
function evaluate(ageGest, hourBirthExam, totalSerumBili, examUnit) {

    console.log("siamo in evaluate");

    let evaluation = 0;
    let arrVal = [];

    // if (examUnit == 'mg/dl') { totalSerumBili = totalSerumBili * MMOL2MGDL; }

    if ((ageGest <= 38) && (ageGest >= 23)) {
        console.log("Check 01!");
        arrVal = getValue(ageGest, hourBirthExam);
        console.log("Check 02! ArrValori= " + arrVal);
        if (totalSerumBili < arrVal[4])
            if (totalSerumBili + totalSerumBili * TOLLERANCE_0_6 >= arrVal[4])
                return NORMALVALUE_3_6;
            else if (totalSerumBili + totalSerumBili * TOLLERANCE_6_12 >= arrVal[4])
                return NORMALVALUE_6_12;
            else
                return NORMALVALUE;

        if ((totalSerumBili >= arrVal[4]) && totalSerumBili <= arrVal[5])

            if (totalSerumBili + totalSerumBili * TOLLERANCE_0_6 >= arrVal[5])
                return PHOTOTHERAPY_3_6;
            else if (totalSerumBili + totalSerumBili * TOLLERANCE_6_12 >= arrVal[5])
                return PHOTOTHERAPY_6_12;
            else
                return PHOTOTHERAPY;

        if ((totalSerumBili > arrVal[5]))
            return EXCHANGETRANSFUSION;
    } else {
        evaluation = NONEVALUALBLE;
    }
    
    return evaluation;
}

//----------------------------------------------
//  function calc text result
//
function calcTextResult(resultNum){ 

    let text = ""; 

    switch(resultNum)
    {
        case NONEVALUALBLE:       text = "Noneval";             break;
        case NORMALVALUE:         text = "Normal";              break;
        case NORMALVALUE_3_6:     text = "Phototerapy_6, r3_6";      break;
        case NORMALVALUE_6_12:    text = "Normal, r6_12";       break;
        case PHOTOTHERAPY:        text = "Phototerapy";         break;
        case PHOTOTHERAPY_3_6:    text = "Phototerapy, r3_6";   break;
        case PHOTOTHERAPY_6_12:   text = "Phototerapy, r6_12";  break;
        case EXCHANGETRANSFUSION: text = "Exanguino";           break;
        default:                  text = "Out of range";        break;
        
    }
    return text
}

//----------------------------------------------
//  function to draw graph
//
function onClickBtnShowGraph() {
    // console.log('Siamo in "disGraf"'); alert('Siamo in "disGraf"');
    const hourAfterBirth = document.getElementById('hourAfterBirth').value;
    const pazEtaGest = document.getElementById('pazEtaGest').value;
    let totalSerumBili = document.getElementById('totalSerumBili').value;
    console.log("Bilirubina totale = " + totalSerumBili);
    const examUnit = document.getElementById('examUnit').value;
    if (examUnit === 'mg/dl') { totalSerumBili = totalSerumBili * MMOL2MGDL };
    const dataLinesGraph = getValue(pazEtaGest, hourAfterBirth);


    console.log("hour pre chiamata = " + hourAfterBirth);
    console.log("Età gest pre chiamata = " + pazEtaGest);
    console.log("Bilirubina totale = " + totalSerumBili);
    console.log("Unità di misura = " + examUnit);
    console.log("Array data graph= " + dataLinesGraph);
    drawGraphic(dataLinesGraph, hourAfterBirth, totalSerumBili);
    
    const resultNum = evaluate(pazEtaGest, hourAfterBirth, totalSerumBili, examUnit)
    console.log("resultNum= " + resultNum);

    const resultText = calcTextResult(resultNum);
    console.log("resultText= " + resultText);

    document.getElementById('result').value = resultText;
};

