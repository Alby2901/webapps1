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

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('calcButton').addEventListener("click", () => {calcolaValori()});
    document.getElementById('resultButton').addEventListener("click", () => {onClickBtnShowGraph()});

    //---------------------------------------------
    // leggere i parametri dall'Url Sotto esempio di set di parametri
    // ?lang=IT & paznome=SELEN & pazcogn=PELLETTERI & pazdnas=202205021321 & pazeg=35 & examumis=mg%2fdl
    //
    // legge la stringa dei parametri nell'url incluso il ?
    let queryString = window.location.search;

    // --------------------- SOLO PER DEBUG ---------------------------
    // se non c'è la querystring ne impone una per i test
    if (!queryString) { queryString = "?lang=IT&paznome=SELEN&pazcogn=PELLETTERI&pazdnas=202205201321&pazeg=35&examumis=mg%2fdl" };
    // ----------------------------------------------------------------

    // -------------------------------------------------------------------
    // ricava parametri specifici con "urlParams.get" e assega a variabili
    // 
    const urlParams = new URLSearchParams(queryString);
    const lang = urlParams.get('lang');
    const pazCognome = urlParams.get('pazcogn');
    const pazNome = urlParams.get('paznome');
    const pazDataNascCompl = urlParams.get('pazdnas');
    const pazEtaGest = urlParams.get('pazeg');
    const esameUnitMis = urlParams.get('examumis');

    //---------------------------------------------
    // Calcola n. ore tra data nascita e data esame
    const hourBirthExam = calcHourBirthExam(pazDataNascCompl, dayjs());

    //---------------------------------------------
    // calc diffDayHour to show in corrispondent field "<days>d <hours>h" --> <trunc(diffDay)> d <round(diffDay - trunc(diffDay)) * 24> h
    const diffDayHour = calcDiffDayHour(pazDataNascCompl, dayjs());

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

    //----------------------------------------------
    // Set inizial value in HTML form fields
    //
    document.getElementById('pazCognNom').value = pazCognome + " " + pazNome;
    document.getElementById('pazEtaGest').value = pazEtaGest;
    document.getElementById('hourAfterBirth').value = hourBirthExam;
    document.getElementById('dayHourAfterBirth').value = diffDayHour;
    document.getElementById('examUnit').value = esameUnitMis;

    document.getElementById('DayTimeofBirth').value = dateTimeFieldStrDateofBirth;
    document.getElementById('DayTimeofBirth').min = dateTimeFieldStrDateofBirth;
    document.getElementById('DayTimeofExam').value = dateTimeFieldStrDateofExam;
    document.getElementById('DayTimeofExam').min = dateTimeFieldStrDateofBirth;

    document.getElementById('pazCognNom').disabled = true;
    document.getElementById('DayTimeofBirth').disabled = true;
    document.getElementById('hourAfterBirth').disabled = true;
    document.getElementById('dayHourAfterBirth').disabled = true;

});




