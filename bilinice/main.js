'use strict'


// leggere i parametri dall'Url Sotto esempio di set di parametri
// ?lang=IT
// paznome=SELEN&pazcogn=PELLETTERI
// &pazdnas=202205021321&pazeg=35&examumis=mg%2fdl
// &lang=IT

// legge la stringa dei parametri nell'url incluso il ?
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// ricava parametri specifici con "urlParams.get" e assega a variabili
const lang = urlParams.get('lang');
const pazCognome = urlParams.get('pazcogn');
const pazNome = urlParams.get('paznome');
const pazDataNascCompl = urlParams.get('pazdnas');
const pazEtaGest = urlParams.get('pazeg');
const esameUnitMis = urlParams.get('examumis');

// mostra in console i dati ricavati dalla queryString
console.log("lang= " + lang);
console.log("pazCognome= " + pazCognome);
console.log("pazNome= " + pazNome);
console.log("pazDataNascCompl= " + pazDataNascCompl);
console.log("pazEtaGest= " + pazEtaGest);
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

// Calcolo n. ore tra data nascita e data esame
// converte i valori in oggetti "dayJS" per poi utilizzare la libreria per i calcoli
// 
const date1 = dayjs(pazDataNascCompl, "YYYYMMDDmmss")               // Date of birth get from Url param
const date2 = dayjs();                                              // Date of exam: default to "now"
const dt1Dt2Diff = date2.diff(date1, 'day', true)                   // calculate date diff in days (float)
const diffDay = Math.round(dt1Dt2Diff);                             // calculate date diff in days (round)
const hourBirthExam = Math.round(date2.diff(date1, 'hour', true));  // calculate hours diff in hours (float then round)

// calc diffDayHour to show in corrispondent field "<days>d <hours>h" --> <trunc(diffDay)> d <round(diffDay - trunc(diffDay)) * 24> h
const diffDayFloat = date2.diff(date1, 'day', true); console.log("diffDayFloat=  " + diffDayFloat);
const diffDaytrunc = date2.diff(date1, 'day', false); console.log("diffDaytrunc=  " + diffDaytrunc);
const diffDayDecimalPart = diffDayFloat - diffDaytrunc; console.log("diffDayDecimalPart=  " + diffDayDecimalPart);
const hourRoundOfDiffDaysDecimalPart = Math.round(diffDayDecimalPart * 24); console.log("hourOfDiffDaysDecimalPart=  " + hourRoundOfDiffDaysDecimalPart);
const diffDayHour = diffDaytrunc + "d " + hourRoundOfDiffDaysDecimalPart + "h";

// Show in console calculated value (will be commented out)
console.log("date1= " + dayjs(date1).format());
console.log("date2= " + dayjs(date2).format());
console.log("DiffDate(day)= " + diffDay);
console.log("hourBirthExam= " + hourBirthExam);
console.log("DiffDateHour= " + diffDayHour);

// calculate string of birth date for set value in the HTML form data-time field  
const dateTimeFieldStrDateofBirth = dayjs(date1).format('YYYY-MM-DD') + "T" + dayjs(date1).format('HH') + ":" + dayjs(date1).format('mm');
const dateTimeFieldStrDateofBirth2 = dateJsObj_2_DateTimeFieldString(date1);
// calculate string of exam date for HTML form data-time field
const dateTimeFieldStrDateofExam = dayjs().format('YYYY-MM-DD') + "T" + dayjs().format('HH') + ":" + dayjs().format('mm');
const dateTimeFieldStrDateofExam2 = dateJsObj_2_DateTimeFieldString();

// Show in console calculated value  (will be commented out)
console.log("date and time 1= " + dateTimeFieldStrDateofBirth);
console.log("date and time 2= " + dateTimeFieldStrDateofBirth2);
console.log("date and time 3= " + dateTimeFieldStrDateofExam);
console.log("date and time 4= " + dateTimeFieldStrDateofExam2);

//
// Set inizial value in HTML form fields
//
document.getElementById('pazCognNom').value = pazCognome + " " + pazNome;
//document.getElementById('pazDataNasc').value = pazDataNasc;   // used before date-time field  wil be avaiable
//document.getElementById('pazOraNasc').value = pazOraNasc;     // used before date-time field  wil be avaiable
//document.getElementById('pazMinNasc').value = pazMinNasc;     // used before date-time field  wil be avaiable
document.getElementById('pazEtaGest').value = pazEtaGest;
document.getElementById('DayTimeofBirth').value = dateTimeFieldStrDateofBirth;
document.getElementById('DayTimeofBirth').min = dateTimeFieldStrDateofBirth;
document.getElementById('DayTimeofExam').value = dateTimeFieldStrDateofExam;
document.getElementById('DayTimeofExam').min = dateTimeFieldStrDateofBirth;
document.getElementById('hourAfterBirth').value = hourBirthExam;
document.getElementById('dayHourAfterBirth').value = diffDayHour;

//  functio to simulate a function call
function calcolaValori() {
    console.log('Siamo in "calcola valori"'); alert('Siamo in "calcola valori"');
};

//  functio to simulate a function call
function disGraf() {
    console.log('Siamo in "disGraf"'); alert('Siamo in "disGraf"');
    console.log("hour pre chiamata = " + document.getElementById('hourAfterBirth').value);
    console.log("Età gest pre chiamata = " + document.getElementById('pazEtaGest').value);
    getValue(document.getElementById('pazEtaGest').value,document.getElementById('hourAfterBirth').value);
};