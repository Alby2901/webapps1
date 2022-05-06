'use strict'

// import dayjs from 'dayjs';

    // leggere i parametri dall'Url
    // ?lang=IT
    //paznome=SELEN&pazcogn=PELLETTERI
    //&pazdnas=202205021321&pazeg=35&examumis=mg%2fdl
    //&lang=IT

    // leggere la stringa incluso il ?
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    //ricava parametri specifici con "urlParams.get"
    const lang = urlParams.get('lang'); console.log("lang= "+lang);
    const pazCognome = urlParams.get('pazcogn'); console.log("pazCognome= " + pazCognome);
    const pazNome = urlParams.get('paznome'); console.log("pazNome= " + pazNome);
    const pazDataNascCompl = urlParams.get('pazdnas'); console.log("pazDataNascCompl= " + pazDataNascCompl);
    const pazEtaGest = urlParams.get('pazeg'); console.log("pazEtaGest= " + pazEtaGest);
    const esameUnitMis = urlParams.get('examumis'); console.log("esameUnitMis= " + esameUnitMis);

    const dateTemp = pazDataNascCompl.toString(); console.log("dateTemp= " + dateTemp);
    const pazDataNasc = dateTemp.substring(0,4) + "-" + dateTemp.substring(4,6) + "-" + dateTemp.substring(6,8);
    console.log("pazDataNasc=  " + pazDataNasc);
    
    const pazDataNasc2 = pazDataNascCompl.substring(0,4) + "-" + pazDataNascCompl.substring(4,6) + "-" + pazDataNascCompl.substring(6,8);
    console.log("pazDataNasc2=  " + pazDataNasc2);
    const pazOraNasc = dateTemp.substring(8,10); console.log("pazOraNasc=  " + pazOraNasc); 
    const pazMinNasc = dateTemp.substring(10,12); console.log("pazMinNasc=  " + pazMinNasc);


    const date1 = dayjs(pazDataNascCompl,"YYYYMMDDmmss")
    console.log("date1= "+ dayjs(date1).format());
    const date2 = dayjs();
    console.log("date2= "+ dayjs(date2).format());
    const diffDay = Math.round(date2.diff(date1, 'day', true));
    const hourBirthExam = Math.round(date2.diff(date1, 'hour', true));
    console.log("DiffDate(day)= "+ diffDay);
    console.log("DiffDate(day)= "+ hourBirthExam);
        
    const dateTimeFieldStrDateofBirth = dayjs(date1).format('YYYY-MM-DD') +"T"+ dayjs(date1).format('HH') +":"+ dayjs(date1).format('mm');
    console.log("date and time= " + dateTimeFieldStrDateofBirth);

    const dateTimeFieldStrDateofExam = dayjs().format('YYYY-MM-DD') +"T"+ dayjs().format('HH') +":"+ dayjs().format('mm');
    console.log("date and time= " + dateTimeFieldStrDateofExam);
 
    
    // const pazDataNasc = dayjs(dateTemp.substring(0,7)); console.log("pazDataNasc=  " + pazDataNasc);
    // const dataCorrente = dayjs(); console.log("dataCorrente=  " + dataCorrente);
    // const dataCorrenteF = dayjs(dataCorrente, "YYYY-MM-DD"); console.log("dataCorrenteF=  " + dataCorrenteF);
    

    // dayjs(date);
    // 202205021321
    
    document.getElementById('pazCognNom').value = pazCognome + " " + pazNome;
    document.getElementById('pazDataNasc').value = pazDataNasc;
    document.getElementById('pazOraNasc').value = pazOraNasc;
    document.getElementById('pazMinNasc').value = pazMinNasc;
    document.getElementById('pazEtaGest').value = pazEtaGest;
    document.getElementById('DayTimeofBirth').value = dateTimeFieldStrDateofBirth;
    document.getElementById('DayTimeofExam').value = dateTimeFieldStrDateofExam;
    document.getElementById('hourAfterBirth').value = hourBirthExam;
    document.getElementById('dayHourAfterBirth').value = diffDay + " days (rounded)";

function calcolaValori(){
    console.log('Siamo in "calcola valori"'); alert('Siamo in "calcola valori"');
}

function disGraf() {

    console.log('Siamo in "disGraf"'); alert('Siamo in "disGraf"');

    // leggere i parametri dall'Url
    // ?lang=IT
    // paznome=SELEN&pazcogn=PELLETTERI
    // &pazdnas=202205021321&pazeg=35&examumis=mg%2fdl
    // &lang=IT

    // leggere la stringa incluso il ?
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    //ricava parametri specifici con "urlParams.get"
    const lang = urlParams.get('lang'); console.log("lang= "+lang);
    const pazCognome = urlParams.get('pazcogn'); console.log("pazCognome= " + pazCognome);
    const pazNome = urlParams.get('paznome'); console.log("pazNome= " + pazNome);
    const pazDataNasc = urlParams.get('pazdnas'); console.log("pazDataNasc= " + pazDataNasc);
    const pazEtaGest = urlParams.get('pazeg'); console.log("pazEtaGest= " + pazEtaGest);
    const esameUnitMis = urlParams.get('examumis'); console.log("esameUnitMis= " + esameUnitMis);

}