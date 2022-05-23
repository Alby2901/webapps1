package
{
	public class Language
	{
		private var _lang:String
		[Bindable]
		public var items:Array
		
		private var IT:Array=new Array();
		private var EN:Array=new Array();
		//italian Item
		
		
		
		private function loadResources():void {
			
			IT["verify"]="verifica";
			IT["memudisclaimer"]="Disclaimer";
			IT["menuabout"]="Informazioni";
			IT["menureference"]="Referenze";
			IT["normal"]="Valori Normali";
			IT["phototerapy"]="eseguire fototerapia";
			IT["phototerapy_6"]="consigliata la foterapia";
			IT["exanguino"]="eseguire exanguino trasfusione";
			IT["r3_6"]="ripetere l'esame entro 6 ore";
			IT["r6_12"]="ripetere l'esame tra 6 - 12 ore";
			IT["noneval"]="non valutabile";
			IT["visualizegraph"]="visualizza grafico";
			IT["app_name"]="Bilirubin Calculator";
			IT["datetimebirth"]="data e ora di nascita";
			IT["dateexam"]="data e ora esame";
			IT["hourlife"]="ore di vita";
			IT["eg"]="EG";
			IT["gestionalage"]="età gestionale"
			IT["exit"]="esci";
			IT["examvalue"]="bilirubina totale";
			IT["umis"]="mmol/DL";
			IT["butcalc"]="calcola";
			IT["invalideg"]="Età Gestazionale non selezionata";
			IT["invaliddate"]="la data di nascita è posteriore alla data dell'esame";
			IT["photoseries"]="fototerapia";
			IT["exchangeseries"]="exanguino trasfusione";
			IT["bilirubinevaluation"]="Valutazione della Birilubina"
			IT["tooold"]="E' possibile effettuare una valutazioneIt solo fino a 14 giorni di vita";
			IT["day"]="g";
			IT["hour"]="h";
			IT["dateformat"]="DD/MM/YYYY";
			IT["pazname"]="cognome e nome";
			IT["app_name"]="Nice Guideline Bilirubin Calculator";
			
			
			EN["verify"]="verify";
			EN["normal"]="Normal Value";
			EN["phototerapy"]="Start Photherapy";
			EN["phototerapy_6"]="Consider Photherapy";
			EN["exanguino"]="Perform Exchange Tranfusion";
			EN["r3_6"]="Repeat bilirubin measurement in 6 hours";
			EN["r6_12"]="Repeat bilirubin measurement in 6 - 12 hours";
			EN["noneval"]="non evaluable";
			EN["visualizegraph"]="visualizza grafico";
			EN["app_name"]="Nice Guideline Bilirubin Calculator";
			EN["datetimebirth"]="time and date of birth";
			EN["dateexam"]="time and date of exam";
			EN["hourlife"]="hours after birth";
			EN["eg"]="GA";
			EN["gestionalage"]="gestional age"
			EN["exit"]="exit";
			EN["examvalue"]="total serum bilirubin";
			EN["umis"]="mmol/DL";
			EN["butcalc"]="evaluate";
			EN["invaliddate"]="The birth date is later than the date of bilirubin measurement ";
			EN["invalidexamdate"]="The date of the bilirubin measurement can not be greater than the current date ";
			EN["invalideg"]="Gestional Age not selected ";
			EN["nullexam"]="bilirubin measurement not defined";
			EN["tooOld"]="It can perform an assessment only up to day 14 of	life ";
			EN["errdata"]="incorrect data";
			EN["bilirubinevaluation"]="Bilirubin Evaluation"
			EN["day"]="d";
			EN["hour"]="h";
			EN["dateformat"]="MM/DD/YYYY";
			EN["pazname"]="patient name";
			EN["photoseries"]="phototherapy";
			EN["exchangeseries"]="exchange tranfusion";
		}
		
		public function Language(language:String)
		{
			loadResources();
			lang=language
			
			
		}
		[Bindable]
		public function getString (itemString:String):String
		{
			if (items[itemString.toLowerCase()])
				return items[itemString.toLocaleLowerCase()];
			else {
				return "no bundle";
				trace (itemString.toLowerCase()+"-no bundle")
			}
		}
		
		public function get lang():String
		{
			return _lang;
		}
		
		public function set lang(value:String):void
		{
			_lang = value;
			if (lang.toLowerCase()=="it")
				items=IT;
			else
				items=EN;
		}
		
	}
}