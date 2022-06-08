'use strict'

let test = 0;
const NONEVALUALBLE = 0;
const NORMALVALUE = 1;
const NORMALVALUE_3_6 = 136;
const NORMALVALUE_6_12 = 1612;
const PHOTOTHERAPY = 2;
const PHOTOTHERAPY_3_6 = 236;
const PHOTOTHERAPY_6_12 = 2612;
const EXCHANGETRANSFUSION = 3;
const EXCHANGETRANSFUSION_3_6 = 336;
const EXCHANGETRANSFUSION_6_12 = 3612;
const MGDL = "mg";
const MMOL = "mmol";
const MGDL_PRECISION = 2;
const TOLLERANCE_0_6 = 0.05;
const TOLLERANCE_6_12 = 0.10;
const MMOL2MGDL = 17.09;
const dataObj = { lang: '', pazCognome: '', pazNome: '', pazDataNascCompl: '', pazEtaGest: 0, esameUnitMis: '', hourBirthExam: 0, diffDayHour: '', bilirubinaSerum: 0, dateOfExam: dayjs(), dateOfBirth:'' };

// Object with terms in different language
const languageTerms = {
    IT: {
        app_name: "Calcolatore Bilirubina Nice",
        bilirubinevaluation: "Valutazione della Birilubina",
        butcalc: "Calcola",
        dateexam: "Data e ora esame",
        dateformat: "DD/MM/YYYY",
        datetimebirth: "Data e ora di nascita",
        day: "g",
        eg: "EG",
        errdata: "Dati errati",
        examvalue: "Bilirubina totale",
        exanguino: "Eseguire exanguino trasfusione",
        exchangeseries: "Exanguino trasfusione",
        exit: "Esci",
        gestionalage: "Età gestionale",
        hour: "h",
        hourlife: "Ore di vita",
        invaliddate: "La data di nascita è posteriore alla data dell'esame",
        invalideg: "Età Gestazionale non selezionata",
        invalidexamdate: "La data della misurazione della bilirubina non può essere maggiore della data odierna",
        memudisclaimer: "Disclaimer",
        menuabout: "Informazioni",
        menureference: "Referenze",
        noneval: "Non valutabile",
        normal: "Valori Normali",
        nullexam: "Valore della bilirubina non definito",
        pazname: "Cognome e nome",
        photoseries: "Fototerapia",
        phototerapy: "Eseguire fototerapia",
        phototerapy_6: "Consigliata la foterapia",
        r3_6: "ripetere l'esame entro 6 ore",
        r6_12: "ripetere l'esame tra 6 - 12 ore",
        tooold: "E' possibile effettuare una valutazione solo nei primi 14 giorni di vita",
        umis: "mmol/dL",
        verify: "Verifica",
        visualizegraph: "Visualizza grafico"
    },
    EN: {
        app_name: "Nice Guideline Bilirubin Calculator",
        bilirubinevaluation: "Bilirubin Evaluation",
        butcalc: "Evaluate",
        dateexam: "Time and date of exam",
        dateformat: "MM/DD/YYYY",
        datetimebirth: "Time and date of birth",
        day: "d",
        eg: "GA",
        errdata: "Incorrect data",
        examvalue: "Total serum bilirubin",
        exanguino: "Perform Exchange Tranfusion",
        exchangeseries: "Exchange tranfusion",
        exit: "Exit",
        gestionalage: "Gestional age",
        hour: "h",
        hourlife: "Hours after birth",
        invaliddate: "The birth date is later than the date of bilirubin measurement ",
        invalideg: "Gestional Age not selected ",
        invalidexamdate: "The date of the bilirubin measurement can not be greater than the current date ",
        memudisclaimer: "Disclaimer",
        menuabout: "Info",
        menureference: "References",
        noneval: "Non evaluable",
        normal: "Normal Value",
        nullexam: "Bilirubin measurement not defined",
        pazname: "Patient name",
        photoseries: "Phototherapy",
        phototerapy: "Start Photherapy",
        phototerapy_6: "Consider Photherapy",
        r3_6: "repeat bilirubin measurement in 6 hours",
        r6_12: "repeat bilirubin measurement in 6 - 12 hours",
        tooold: "It can perform an assessment only up to day 14 of life ",
        umis: "mmol/dL",
        verify: "Verify",
        visualizegraph: "Show graph"
    }
};

//inputData = [pazCognome, pazNome, pazDataNascCompl, pazEtaGest, esameUnitMis];

// gerenal event handler run after DOM loaded
document.addEventListener('DOMContentLoaded', () => {

    // defin event handler for the two buttons
    document.getElementById('calcButton').addEventListener("click", () => { calcolaValori() });
    document.getElementById('resultButton').addEventListener("click", () => { onClickBtnShowGraph() });
    document.getElementById('DayTimeofExam').addEventListener("change", () => { calcolaValori() });
    document.getElementById('totalSerumBili').addEventListener("change", () => { updDtaObjBilir() });
    document.getElementById('lockButton').addEventListener("click", () => { lockUnlockField() });
    document.getElementById('unlockButton').addEventListener("click", () => { lockUnlockField() });

    // read parameter from query string and set value in inpuput data obj
    showVersion();
    getInputDataFromQueryString();

    console.log("01-Data Obj= " + JSON.stringify(dataObj, null, 4));

    //---------------------------------------------
    // Calc number of hours from birth date and exam date (exam date default = today!)
    dataObj.hourBirthExam = calcHourBirthExam(dataObj.pazDataNascCompl, dayjs());

    console.log("02-Data Obj= " + JSON.stringify(dataObj, null, 4));

    //---------------------------------------------
    // calc diffDayHour to show in corrispondent field --> string "<days>d <hours>h" --> <trunc(diffDay)> d <round(diffDay - trunc(diffDay)) * 24> h
    dataObj.diffDayHour = calcDiffDayHour(dataObj.pazDataNascCompl, dayjs());

    //----------------------------------------------
    // Set inizial value in HTML form fields
    //
    setInizialValueOfInputField();


    // Test functions
    // let testlang = "";

    // testlang = "IT";
    // console.log(testlang + " App= " + languageTerms[testlang].app_name);

    // testlang = "EN";
    // console.log(testlang + " App= " + languageTerms[testlang].app_name);

    // console.log("Arrotonda 2.005 = " + roundToDigit(2.005, 2));

});




