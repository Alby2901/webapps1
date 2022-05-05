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
    const pazOraNasc = dateTemp.substring(8,10); console.log("pazOraNasc=  " + pazOraNasc); 
    const pazMinNasc = dateTemp.substring(10,12); console.log("pazMinNasc=  " + pazMinNasc); 
    
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