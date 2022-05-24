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
const dataObj = {lang:'', pazCognome:'', pazNome:'', pazDataNascCompl:'', pazEtaGest:0, esameUnitMis:'', hourBirthExam:0, diffDayHour:'', bilirubinaSerum:0};

//inputData = [pazCognome, pazNome, pazDataNascCompl, pazEtaGest, esameUnitMis];

// gerenal event handler run after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // defin event handler for the two buttons
    document.getElementById('calcButton').addEventListener("click", () => {calcolaValori()});
    document.getElementById('resultButton').addEventListener("click", () => {onClickBtnShowGraph()});

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
    // mmol2mgdl(201);

    
});




