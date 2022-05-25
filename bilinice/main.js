'use strict'

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
const dataObj = { lang: '', pazCognome: '', pazNome: '', pazDataNascCompl: '', pazEtaGest: 0, esameUnitMis: '', hourBirthExam: 0, diffDayHour: '', bilirubinaSerum: 0 };

const languageTerms = {
    IT: {
        app_name: "Calcolatore Bilirubina Nice",
        bilirubinevaluation: "Valutazione della Birilubina",
        butcalc: "calcola",
        dateexam: "data e ora esame",
        dateformat: "DD/MM/YYYY",
        datetimebirth: "data e ora di nascita",
        day: "g",
        eg: "EG",
        errdata: "dati errati",
        examvalue: "bilirubina totale",
        exanguino: "eseguire exanguino trasfusione",
        exchangeseries: "exanguino trasfusione",
        exit: "esci",
        gestionalage: "età gestionale",
        hour: "h",
        hourlife: "ore di vita",
        invaliddate: "La data di nascita è posteriore alla data dell'esame",
        invalideg: "Età Gestazionale non selezionata",
        invalidexamdate: "La data della misurazione della bilirubina non può essere maggiore della data odierna",
        memudisclaimer: "Disclaimer",
        menuabout: "Informazioni",
        menureference: "Referenze",
        noneval: "non valutabile",
        normal: "Valori Normali",
        nullexam: "Valore della bilirubina non definito",
        pazname: "cognome e nome",
        photoseries: "fototerapia",
        phototerapy: "eseguire fototerapia",
        phototerapy_6: "consigliata la foterapia",
        r3_6: "ripetere l'esame entro 6 ore",
        r6_12: "ripetere l'esame tra 6 - 12 ore",
        tooold: "E' possibile effettuare una valutazioneIt solo fino a 14 giorni di vita",
        umis: "mmol/dL",
        verify: "verifica",
        visualizegraph: "visualizza grafico"
    },
    EN: {
        app_name: "Nice Guideline Bilirubin Calculator",
        bilirubinevaluation: "Bilirubin Evaluation",
        butcalc: "evaluate",
        dateexam: "time and date of exam",
        dateformat: "MM/DD/YYYY",
        datetimebirth: "time and date of birth",
        day: "d",
        eg: "GA",
        errdata: "incorrect data",
        examvalue: "total serum bilirubin",
        exanguino: "Perform Exchange Tranfusion",
        exchangeseries: "exchange tranfusion",
        exit: "exit",
        gestionalage: "gestional age",
        hour: "h",
        hourlife: "hours after birth",
        invaliddate: "The birth date is later than the date of bilirubin measurement ",
        invalideg: "Gestional Age not selected ",
        invalidexamdate: "The date of the bilirubin measurement can not be greater than the current date ",
        memudisclaimer: "Disclaimer",
        menuabout: "Info",
        menureference: "References",
        noneval: "non evaluable",
        normal: "Normal Value",
        nullexam: "bilirubin measurement not defined",
        pazname: "patient name",
        photoseries: "phototherapy",
        phototerapy: "Start Photherapy",
        phototerapy_6: "Consider Photherapy",
        r3_6: "Repeat bilirubin measurement in 6 hours",
        r6_12: "Repeat bilirubin measurement in 6 - 12 hours",
        tooold: "It can perform an assessment only up to day 14 of  life ",
        umis: "mmol/dL",
        verify: "verify",
        visualizegraph: "show graph"
    }
};

//inputData = [pazCognome, pazNome, pazDataNascCompl, pazEtaGest, esameUnitMis];

// gerenal event handler run after DOM loaded
document.addEventListener('DOMContentLoaded', () => {

    // defin event handler for the two buttons
    document.getElementById('calcButton').addEventListener("click", () => { calcolaValori() });
    document.getElementById('resultButton').addEventListener("click", () => { onClickBtnShowGraph() });

    // read parameter from query string and set value in inpuput data obj
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

    console.log("IT App = " + languageTerms.IT.app_name);
    console.log("EN App = " + languageTerms.EN.app_name);

});




