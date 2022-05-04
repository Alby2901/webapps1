'use strict'

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
    const pazDataNasc = urlParams.get('pazdnas'); console.log("pazDataNasc= " + pazDataNasc);
    const pazEtaGest = urlParams.get('pazeg'); console.log("pazEtaGest= " + pazEtaGest);
    const esameUnitMis = urlParams.get('examumis'); console.log("esameUnitMis= " + esameUnitMis);

    
    document.getElementById('pazCognNom').value = pazCognome + " " + pazNome;
    document.getElementById('pazDataNasc').value = pazDataNasc;


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