# Progetto paapplicazione Bilirubina Nice

Il progetto consta nel rifacimento di una applicazione attualmente web 
attualmente realizzata in FLASH che da tempo non è più supportato dai browser attuali

L'applicazione riceve tramite l'url di chiamata i seguenti parametri:
 - cognome e nome del paziente
 - data di nascita
 - età gestazionale
 - unità di misura della bilirubina sierica
 - lingua

L'applicazione permette di inserire la data dell'esame della bilisubina seirica (default = data corrente)
e il valore della bilirubina sierica dell'esame effettuato.

L'applicazione valuta in base ai valori se il paziente ha una situazione normale oppure se deve essere trattato 
con Fototerapia o Trasfusione; viene mostrato un grafico con le curve limite per la fototerapia e per la Trasfusione ed il punto che mostra il valore attuale della bilirubina sierica in funzione delle ore di vita del paziente

# Struttura del progetto

## Files
 - index.html -> pagina html con i componenti iniziali: campi con i dati, pulsanti per il ricalcolo delle ore di vita e per il calcolo del risultato e la visiualizzazione del grafico
    - carica da web Bootstrap 
    - carica da web la libreris JS DayJS per la gestione delle date
    - carica da locale la libreria JS Echarts
    - carica da locale i file function.js e main.js in modalità "defer"
    - 

 - echarts.js -> libreria JS per gestione grafici

 - main.css -> file css interno (viene di base utilizzata la libreria Bootstrap)

 - function.js -> file con tutte le funzioni Javascript

 - main.js -> file con il proogramma principale Javascript

## main.JS

 - legge la stringa dei parametri nell'url incluso il ?
 - ricava parametri specifici con "urlParams.get" e assega a variabili
 - Calcola n. ore tra data nascita e data esame con la funzione "calcHourBirthExam(pazDataNascCompl, dayjs())"
 - Calcola n. ore tra data nascita e data esame in n. giorni e numero di ore con la funzione "calcDiffDayHour(pazDataNascCompl,dayjs())"
 - Calcola la stringa della data di nascita per impostare l'elemento HTML corrispondente
 - Calcola la stringa della data dell'esame per impostare l'elemento HTML corrispondente (data e ora corrente)
 - imposta i valori correnti iniziali degli elementi HTML  

