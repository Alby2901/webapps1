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
const TOLLERANCE_0_6 = 0.05;
const TOLLERANCE_6_12 = 0.10;
const MMOL2MGDL = 17.09;

//---------------------------------------------
// leggere i parametri dall'Url Sotto esempio di set di parametri
// ?lang=IT & paznome=SELEN & pazcogn=PELLETTERI & pazdnas=202205021321 & pazeg=35 & examumis=mg%2fdl
//
// legge la stringa dei parametri nell'url incluso il ?
let queryString = window.location.search;

if (!queryString)
{queryString="?lang=IT&paznome=SELEN&pazcogn=PELLETTERI&pazdnas=202205021321&pazeg=35&examumis=mg%2fdl"};

const urlParams = new URLSearchParams(queryString);

// --------------------------------------------
// ricava parametri specifici con "urlParams.get" e assega a variabili
const lang = urlParams.get('lang');
const pazCognome = urlParams.get('pazcogn');
const pazNome = urlParams.get('paznome');
const pazDataNascCompl = urlParams.get('pazdnas');
const pazEtaGest = urlParams.get('pazeg');
const esameUnitMis = urlParams.get('examumis');

// // mostra in console i dati ricavati dalla queryString
// console.log("lang= " + lang);
// console.log("pazCognome= " + pazCognome);
// console.log("pazNome= " + pazNome);
// console.log("pazDataNascCompl= " + pazDataNascCompl);
// console.log("pazEtaGest= " + pazEtaGest);
console.log("esameUnitMis= " + esameUnitMis);

// gestione Data di nascita con campi data, ora, minuti separati - DEPRECTA in favore di campo unico data-ora
//
// const dateTemp = pazDataNascCompl.toString(); console.log("dateTemp= " + dateTemp);
// const pazDataNasc = dateTemp.substring(0, 4) + "-" + dateTemp.substring(4, 6) + "-" + dateTemp.substring(6, 8);
// console.log("pazDataNasc=  " + pazDataNasc);

// const pazDataNasc2 = pazDataNascCompl.substring(0, 4) + "-" + pazDataNascCompl.substring(4, 6) + "-" + pazDataNascCompl.substring(6, 8);
// console.log("pazDataNasc2=  " + pazDataNasc2);
// const pazOraNasc = dateTemp.substring(8, 10); console.log("pazOraNasc=  " + pazOraNasc);
// const pazMinNasc = dateTemp.substring(10, 12); console.log("pazMinNasc=  " + pazMinNasc);

// Calcola n. ore tra data nascita e data esame
const hourBirthExam = calcHourBirthExam(pazDataNascCompl, dayjs());

// const date1 = dayjs(pazDataNascCompl, "YYYYMMDDmmss")               // Date of birth get from Url param
// const date2 = dayjs();                                              // Date of exam: default to "now"
// const dt1Dt2Diff = date2.diff(date1, 'day', true)                   // calculate date diff in days (float)
// const diffDay = Math.round(dt1Dt2Diff);                             // calculate date diff in days (round)
// const hourBirthExam = Math.round(date2.diff(date1, 'hour', true));  // calculate hours diff in hours (float then round)

//---------------------------------------------
// calc diffDayHour to show in corrispondent field "<days>d <hours>h" --> <trunc(diffDay)> d <round(diffDay - trunc(diffDay)) * 24> h
const diffDayHour = calcDiffDayHour(pazDataNascCompl,dayjs());

// // Show in console calculated value (will be commented out)
// console.log("diffDayFloat=  " + diffDayFloat);
// console.log("diffDaytrunc=  " + diffDaytrunc);
// console.log("diffDayDecimalPart=  " + diffDayDecimalPart);
// console.log("hourOfDiffDaysDecimalPart=  " + hourRoundOfDiffDaysDecimalPart);

// // Show in console calculated value (will be commented out)
// console.log("date1= " + dayjs(date1).format());
// console.log("date2= " + dayjs(date2).format());
// console.log("DiffDate(day)= " + diffDay);
// console.log("hourBirthExam= " + hourBirthExam);
// console.log("DiffDateHour= " + diffDayHour);

//----------------------------------------------
// calculate string of birth date for set value in the HTML form data-time field 
//
// const dateField1 = dayjs(pazDataNascCompl, "YYYYMMDDmmss")
// const dateTimeFieldStrDateofBirth = dayjs(dateField1).format('YYYY-MM-DD') + "T" + dayjs(dateField1).format('HH') + ":" + dayjs(dateField1).format('mm');
// const dateTimeFieldStrDateofBirth = dateJsObj_2_DateTimeFieldString(dateField1);

const dateTimeFieldStrDateofBirth = dateJsObj_2_DateTimeFieldString(dayjs(pazDataNascCompl, "YYYYMMDDmmss"));


//----------------------------------------------
// calculate string of exam date for HTML form data-time field
// const dateField2 = dayjs();
// const dateTimeFieldStrDateofExam = dayjs(dateField2).format('YYYY-MM-DD') + "T" + dayjs(dateField2).format('HH') + ":" + dayjs(dateField2).format('mm');
// const dateTimeFieldStrDateofExam2 = dateJsObj_2_DateTimeFieldString(dateField2);

const dateTimeFieldStrDateofExam = dateJsObj_2_DateTimeFieldString(dayjs());

// // Show in console calculated value  (will be commented out)
// console.log("date and time 1= " + dateTimeFieldStrDateofBirth);
// console.log("date and time 2= " + dateTimeFieldStrDateofBirth2);
// console.log("date and time 3= " + dateTimeFieldStrDateofExam);
// console.log("date and time 4= " + dateTimeFieldStrDateofExam2);

//----------------------------------------------
// Set inizial value in HTML form fields
//
document.getElementById('pazCognNom').value = pazCognome + " " + pazNome;
document.getElementById('pazEtaGest').value = pazEtaGest;
document.getElementById('hourAfterBirth').value = hourBirthExam;
document.getElementById('dayHourAfterBirth').value = diffDayHour;
document.getElementById('examUnit').value = esameUnitMis;

//document.getElementById('pazDataNasc').value = pazDataNasc;   // used before date-time field  wil be avaiable
//document.getElementById('pazOraNasc').value = pazOraNasc;     // used before date-time field  wil be avaiable
//document.getElementById('pazMinNasc').value = pazMinNasc;     // used before date-time field  wil be avaiable
document.getElementById('DayTimeofBirth').value = dateTimeFieldStrDateofBirth;
document.getElementById('DayTimeofBirth').min = dateTimeFieldStrDateofBirth;
document.getElementById('DayTimeofExam').value = dateTimeFieldStrDateofExam;
document.getElementById('DayTimeofExam').min = dateTimeFieldStrDateofBirth;

document.getElementById('pazCognNom').disabled = true;
document.getElementById('DayTimeofBirth').disabled = true;
document.getElementById('hourAfterBirth').disabled = true;
document.getElementById('dayHourAfterBirth').disabled = true;

