'use strict'


//----------------------------------------------
// Function to roun decimal number to a certain number of digit ead data from query string and set value ov dataObj
// work direct on dataObj  
//
function roundToDigit(num, digit) {
    const pot = Math.pow(10, digit);
    return Math.round(num * pot) / pot;
}

//----------------------------------------------
// Function to read data from query string and set value ov dataObj
// work direct on dataObj  
//
function getInputDataFromQueryString() {

    //---------------------------------------------
    // leggere i parametri dall'Url Sotto esempio di set di parametri
    // ?lang=IT & paznome=SELEN & pazcogn=PELLETTERI & pazdnas=202205021321 & pazeg=35 & examumis=mg%2fdl
    //
    // legge la stringa dei parametri nell'url incluso il ?
    let queryString = window.location.search;

    // --------------------- SOLO PER DEBUG ---------------------------
    // se non c'è la querystring ne impone una per i test

    if (!queryString) {

        // dayjs(date).format('YYYY-MM-DD')
        const tempDateOfBirth = dayjs().subtract(45, 'hour').format('YYYYMMDDHHmm');
        // console.log("Data nascita fittizia= " + tempDateOfBirth);
        queryString = "?lang=IT&paznome=NOME&pazcogn=COGNOME&pazdnas=" + tempDateOfBirth + "&pazeg=35&examumis=mg%2fdl"
    };
    // ----------------------------------------------------------------

    // -------------------------------------------------------------------
    // ricava parametri specifici con "urlParams.get" e assegna i valori all'oggetto dataObj
    // 
    const urlParams = new URLSearchParams(queryString);

    dataObj.lang = urlParams.get('lang');
    dataObj.pazCognome = urlParams.get('pazcogn');
    dataObj.pazNome = urlParams.get('paznome');
    dataObj.pazDataNascCompl = urlParams.get('pazdnas');
    dataObj.pazEtaGest = urlParams.get('pazeg');
    // check pazEtaàGest  1 >= EG >= 38
    if (isNaN((Number(dataObj.pazEtaGest))) || Number(dataObj.pazEtaGest) < 1 || Number(dataObj.pazEtaGest) > 38) {
        alert(languageTerms[dataObj.lang].invalidegreceived);
        return false;
    }
    dataObj.esameUnitMis = urlParams.get('examumis');
    dataObj.dateOfBirth = dayjs(dataObj.pazDataNascCompl, "YYYYMMDDmmss");

}

//----------------------------------------------
// Function to check value are correct for calculation
// work direct on dataObj  
//
function validate() {

    // let text = "";
    const lang = dataObj.lang;

    const dateBorn = dayjs(dataObj.pazDataNascCompl, "YYYYMMDDmmss");
    const dateExam = dataObj.dateOfExam;

    // check dateBorn > dateExam
    if (dateBorn > dateExam) {
        alert(languageTerms[lang].invaliddate);
        return false;
    }

    // check dateExam-dateBirn > 336 (protol apply between 0 and 14 day)  
    if (dateExam.diff(dateBorn, 'hour', true) > 14 * 24) {
        alert(languageTerms[lang].tooold);
        return false;
    }

    // check dateExam > today
    if (dateExam > dayjs()) {
        alert(languageTerms[lang].invalidexamdate);
        return false;
    }

    // check val biliserum inserted
    if ((isNaN(Number(dataObj.bilirubinaSerum))) || (dataObj.bilirubinaSerum == "")) {
        alert(languageTerms[lang].nullexam);
        return false;
    }

    // check pazEtaàGest  1 >= EG >= 38
    if (isNaN((Number(dataObj.pazEtaGest))) || Number(dataObj.pazEtaGest) < 1 || Number(dataObj.pazEtaGest) > 38) {
        alert(languageTerms[lang].invalideg);
        return false;
    }

    return true;
}

//----------------------------------------------
// Function to check value are correct for calculation
// work direct on dataObj  
//
function updDtaObjBilir() {
    dataObj.bilirubinaSerum = Number(document.getElementById('totalSerumBili').value);
}

//----------------------------------------------
// Function to set the inizial value of input field 
//
function setInizialValueOfInputField() {

    //----------------------------------------------
    // Set inizial value in HTML form fields
    //
    document.getElementById('pazCognNom').value = dataObj.pazCognome + " " + dataObj.pazNome;
    document.getElementById('pazEtaGest').value = dataObj.pazEtaGest;
    document.getElementById('hourAfterBirth').value = dataObj.hourBirthExam;
    document.getElementById('dayHourAfterBirth').value = dataObj.diffDayHour;
    document.getElementById('examUnit').value = dataObj.esameUnitMis;

    //----------------------------------------------
    // Calculate string of birth date for set value in the HTML form data-time field 
    // (Data-time field need to receive value as a string like  "YYYY-MM-DDTHH:MM" -> example: "2022-05-20T20:58")
    //
    const dateTimeFieldStrDateofBirth = dateJsObj_2_DateTimeFieldString(dayjs(dataObj.pazDataNascCompl, "YYYYMMDDmmss"));

    //----------------------------------------------
    // Calculate string of exam date for set value in the HTML form data-time field 
    // (Data-time field need to receive value as a string like  "YYYY-MM-DDTHH:MM" -> example: "2022-05-20T20:58")
    //
    const dateTimeFieldStrDateOfExam = dateJsObj_2_DateTimeFieldString(dayjs());

    document.getElementById('DayTimeofBirth').value = dateTimeFieldStrDateofBirth;
    document.getElementById('DayTimeofBirth').min = dateTimeFieldStrDateofBirth;
    document.getElementById('DayTimeofExam').value = dateTimeFieldStrDateOfExam;
    document.getElementById('DayTimeofExam').min = dateTimeFieldStrDateofBirth;

    //----------------------------------------------
    // disable fields which not need to be change by user
    //
    //document.getElementById('pazCognNom').disabled = true;
    // document.getElementById('DayTimeofBirth').disabled = true;
    // document.getElementById('hourAfterBirth').disabled = true;
    // document.getElementById('dayHourAfterBirth').disabled = true;
    // document.getElementById('pazEtaGest').disabled = true;
    // document.getElementById('lockButton').style.display = "none";

    lockUnlockField()

}

//----------------------------------------------
// Function to set the inizial value of input field 
//
function lockUnlockField() {
    const x = document.getElementById("lockButton");
    console.log("Stato = " + x.style.display);
    if (x.style.display === "none") {
        document.getElementById('pazCognNom').disabled = false;
        document.getElementById('DayTimeofBirth').disabled = false;
        document.getElementById('hourAfterBirth').disabled = false;
        document.getElementById('dayHourAfterBirth').disabled = false;
        document.getElementById('pazEtaGest').disabled = false;
        document.getElementById('lockButton').style.display = "block";
        document.getElementById('unlockButton').style.display = "none";

    } else {
        document.getElementById('pazCognNom').disabled = true;
        document.getElementById('DayTimeofBirth').disabled = true;
        document.getElementById('hourAfterBirth').disabled = true;
        document.getElementById('dayHourAfterBirth').disabled = true;
        document.getElementById('pazEtaGest').disabled = true;
        document.getElementById('lockButton').style.display = "none";
        document.getElementById('unlockButton').style.display = "block";
    }

}

//----------------------------------------------
// Function to show version
//
function showVersion() {
    document.getElementById("version").innerHTML = "<br><p>Version 1.01 - 20220623 - A.Azzola, P.Como</p>"
}

//----------------------------------------------
// Function to convert objet dateJS to string for set value of data-time field: "YYYY-MM-DDTHH:MM" -> example: "2022-05-20T20:58"
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
    const date2 = dayjs(objDatejs);                                     // convert date in dayJS obj (may not be necessary)
    const datediff = date2.diff(date1, 'hour', true)
    const hourBirthExam = Math.floor(datediff);  // calculate hours diff in hours (float then round)
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
    const hourRoundOfDiffDaysDecimalPart = Math.floor(diffDayDecimalPart * 24);
    const diffDayHour = diffDaytrunc + "d " + hourRoundOfDiffDaysDecimalPart + "h";
    return diffDayHour;

};

//---------------------------------------------
//Function to convert siero bilirubin value from mmol/dl to mg/dl
//
function mmol2mgdl(mmolValue) {

    // const mgdlValue = Math.round((Number(mmolValue) / MMOL2MGDL)*100)/100;

    console.log("test1 f.mmol2mgdl = " + (Number(mmolValue) / MMOL2MGDL));

    const mgdlValue = parseFloat((Number(mmolValue) / MMOL2MGDL).toFixed(MGDL_PRECISION));

    console.log("test2 f.mmol2mgdl = " + mgdlValue);
    return mgdlValue

};

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
    pointVal[38] = ["100", "100", "200", "", "350", "450"];

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
function drawGraphic(dataLinesGraph, hourAfterBirth, totalSerumBili, examUnit, pazEtaGest) {
    let data = [];
    let totalSerumBiliLoc = totalSerumBili;
    if (examUnit != 'mg/dl') {
        data = [...dataLinesGraph];

    } else {
        data = dataLinesGraph.map((v) => v / MMOL2MGDL);
        totalSerumBiliLoc = totalSerumBiliLoc / MMOL2MGDL;
    }

    const dayAfterBirth = Math.round(hourAfterBirth / 24 * 100) / 100;

    console.log('drawGraphic data = ' + data);
    // console.log('hourAfterBirth = ' + hourAfterBirth);
    // console.log('dayAfterBirth= ' + dayAfterBirth);

    var myChart = echarts.init(document.getElementById('main'));
    var serie1 = {
        name: 'Phototerapy', showSymbol: false, type: 'line', color: 'blue', data: [
            [0, data[0]],
            [3, data[2]],
            [14, data[2]]],
    };

    var serie2 = {
        name: 'Exchange Transfusion', showSymbol: false, type: 'line', color: 'red', data: [
            [0, data[1]],
            [3, data[3]],
            [14, data[3]]],
    };

    var serie3 = { name: 'Photot. limit', type: 'scatter', color: 'blue', data: [[dayAfterBirth, data[4]]], };
    var serie4 = { name: 'ExchangeT. limit', type: 'scatter', color: 'red', data: [[dayAfterBirth, data[5]]], };

    if (pazEtaGest === "38") {

        // pointVal[38] = ["100", "100", "200", "", "350", "450"];

        serie1 = {
            name: 'Phototerapy', showSymbol: false, type: 'line', color: 'blue', data: [
                [0, data[0]],
                [1, data[2]],
                [4, data[4]],
                [14, data[4]]],
        };
        serie2 = {
            name: 'Exchange Transfusion', showSymbol: false, type: 'line', color: 'red', data: [
                [0, data[1]],
                [1.75, data[5]],
                [14, data[5]]],
        };
        serie3 = { name: 'Photot. limit', type: 'scatter', color: 'blue', data: [[dayAfterBirth, data[6]]], };
        serie4 = { name: 'ExchangeT. limit', type: 'scatter', color: 'red', data: [[dayAfterBirth, data[7]]], };
    }

    const serie5 = { name: 'Patient Bilir. Serum', type: 'scatter', color: 'green', data: [[dayAfterBirth, totalSerumBiliLoc]], };

    var option = {
        title: {
            text: "Bilirubine Nice Graph",
            subtext: "Gestional Age: " + pazEtaGest,
            left: "center",
            top: "top",
            itemGap: 5,
            textStyle: {
                fontSize: 25
            },
            subtextStyle: {
                fontSize: 18
            }
        },

        legend: {
            data: ['Phototerapy', 'Exchange Transfusion', 'Photot. limit', 'ExchangeT. limit', 'Patient Bilir. Serum'],
            top: 'bottom',
        },

        xAxis: {
            // data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

            minorTick: {
                show: true
            },
            name: 'Day of Life',
            nameLocation: 'middle',
            vertticalAlign: 'bottom',
            nameGap: 25,
            nameTextStyle: {
                fontWeight: 'bold',
            },
            interval: 1
        },
        yAxis: {

            name: 'Bilirubin Serum',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontWeight: 'bold',
            },
        },
        series: [
            serie1,
            serie2,
            serie3,
            serie4,
            serie5,

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
    console.log('calcolaValori date1= ' + date1);
    console.log('calcolaValori date2= ' + date2);

    dataObj.dateOfExam = date2;
    console.log("calcolaValori dataObj1= " + JSON.stringify(dataObj, null, 4));

    dataObj.dateOfExam = dayjs(date2);
    console.log("calcolaValori dataObj2= " + JSON.stringify(dataObj, null, 4));

    document.getElementById('hourAfterBirth').value = calcHourBirthExam(date1, date2);
    document.getElementById('dayHourAfterBirth').value = calcDiffDayHour(date1, date2);

};

//----------------------------------------------
//  function calc numeric result
//
function evaluate(ageGest, hourBirthExam, totalSerumBili) {

    console.log("siamo in evaluate");

    let evaluation = 0;
    let arrVal = [];

    if ((ageGest <= 38) && (ageGest >= 23)) {
        console.log("Check 01!");
        arrVal = getValue(ageGest, hourBirthExam);
        const lowLimit = (ageGest == '38') ? arrVal[6] : arrVal[4];
        const hightLimit = (ageGest == '38') ? arrVal[7] : arrVal[5];

        console.log("Check 02! ArrValori= " + arrVal);
        if (totalSerumBili < lowLimit)
            if (totalSerumBili + totalSerumBili * TOLLERANCE_0_6 >= lowLimit)
                return NORMALVALUE_3_6;
            else if (totalSerumBili + totalSerumBili * TOLLERANCE_6_12 >= lowLimit)
                return NORMALVALUE_6_12;
            else
                return NORMALVALUE;

        if ((totalSerumBili >= lowLimit) && totalSerumBili <= hightLimit)

            if (totalSerumBili + totalSerumBili * TOLLERANCE_0_6 >= hightLimit)
                return PHOTOTHERAPY_3_6;
            else if (totalSerumBili + totalSerumBili * TOLLERANCE_6_12 >= hightLimit)
                return PHOTOTHERAPY_6_12;
            else
                return PHOTOTHERAPY;

        if ((totalSerumBili > hightLimit))
            return EXCHANGETRANSFUSION;
    } else {
        evaluation = NONEVALUALBLE;
    }

    return evaluation;
}

//----------------------------------------------
//  function calc text result
//
function calcTextResult(resultNum) {

    let text = "";
    const lang = dataObj.lang;
    // console.log("calcTextResult Lang="+ lang);

    switch (resultNum) {
        // case NONEVALUALBLE: text = "Noneval"; break;
        // case NORMALVALUE: text = "Normal"; break;
        // case NORMALVALUE_3_6: text = "Phototerapy_6, r3_6"; break;
        // case NORMALVALUE_6_12: text = "Normal, r6_12"; break;
        // case PHOTOTHERAPY: text = "Phototerapy"; break;
        // case PHOTOTHERAPY_3_6: text = "Phototerapy, r3_6"; break;
        // case PHOTOTHERAPY_6_12: text = "Phototerapy, r6_12"; break;
        // case EXCHANGETRANSFUSION: text = "Exanguino"; break;

        case NONEVALUALBLE: text = languageTerms[lang].noneval; break;
        case NORMALVALUE: text = languageTerms[lang].normal; break;
        case NORMALVALUE_3_6: text = languageTerms[lang].phototerapy_6 + ", " + languageTerms[lang].r3_6; break;
        case NORMALVALUE_6_12: text = languageTerms[lang].normal + ", " + languageTerms[lang].r6_12; break;
        case PHOTOTHERAPY: text = languageTerms[lang].phototerapy; break;
        case PHOTOTHERAPY_3_6: text = languageTerms[lang].phototerapy + ", " + languageTerms[lang].r3_6; break;
        case PHOTOTHERAPY_6_12: text = languageTerms[lang].phototerapy + ", " + languageTerms[lang].r6_12; break;
        case EXCHANGETRANSFUSION: text = languageTerms[lang].exanguino; break;
        default: text = "Out of range - ADVICE SERVICE!"; break;
    }
    return text

}

//----------------------------------------------
//  function to draw graph
//
function onClickBtnShowGraph() {
    if (validate()) {

        // console.log('Siamo in "disGraf"'); alert('Siamo in "disGraf"');
        const hourAfterBirth = document.getElementById('hourAfterBirth').value;
        const pazEtaGest = document.getElementById('pazEtaGest').value;
        let totalSerumBili = document.getElementById('totalSerumBili').value;
        totalSerumBili = parseFloat(totalSerumBili);
        console.log("Bilirubina totale = " + totalSerumBili);
        const examUnit = document.getElementById('examUnit').value;
        if (examUnit === 'mg/dl') { totalSerumBili = totalSerumBili * MMOL2MGDL };
        const dataLinesGraph = getValue(pazEtaGest, hourAfterBirth);


        console.log("hour pre chiamata = " + hourAfterBirth);
        console.log("Età gest pre chiamata = " + pazEtaGest);
        console.log("Bilirubina totale = " + totalSerumBili);
        console.log("Unità di misura = " + examUnit);
        console.log("Array data graph= " + dataLinesGraph);
        drawGraphic(dataLinesGraph, hourAfterBirth, totalSerumBili, examUnit, pazEtaGest);

        const resultNum = evaluate(pazEtaGest, hourAfterBirth, totalSerumBili)
        console.log("resultNum= " + resultNum);

        const resultText = calcTextResult(resultNum, dataObj);
        console.log("resultText= " + resultText);

        document.getElementById('result').value = resultText;

        let lowLimit = (pazEtaGest == '38') ? dataLinesGraph[6] : dataLinesGraph[4];
        lowLimit = (examUnit === 'mg/dl') ? roundToDigit(lowLimit / MMOL2MGDL, 2) : lowLimit;
        const lowLimitstr = "LowLimit (blue pint)= " + lowLimit;

        let hightLimit = ((pazEtaGest == '38') ? dataLinesGraph[7] : dataLinesGraph[5]);
        hightLimit = (examUnit === 'mg/dl') ? roundToDigit(hightLimit / MMOL2MGDL, 2) : hightLimit;
        const hightLimitstr = "HightLimit (red point)= " + hightLimit;

        totalSerumBili = (examUnit === 'mg/dl') ? roundToDigit(totalSerumBili / MMOL2MGDL, 2) : totalSerumBili;
        const totalSerumBili_00_06 = roundToDigit(totalSerumBili + totalSerumBili * TOLLERANCE_0_6, 2);
        const totalSerumBili_06_12 = roundToDigit(totalSerumBili + totalSerumBili * TOLLERANCE_6_12, 2);
        const totalSerumBilistr = "Bilirubin (val, +5%, +10%)= " + totalSerumBili + ", " + totalSerumBili_00_06 + ", " + totalSerumBili_06_12

        document.getElementById('value').value = lowLimitstr + '\n' + hightLimitstr + '\n' + totalSerumBilistr;
    }
};



