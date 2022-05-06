package
{
	import mx.collections.ArrayCollection;

	public class Nomogram
	{
		private var values:Array = new Array();
		public static var NONEVALUALBLE:int = 0;
		public static var NORMALVALUE:int = 1;
		public static var NORMALVALUE_3_6:int = 136;
		public static var NORMALVALUE_6_12:int = 1612;
		public static var PHOTOTHERAPY:int = 2;
		public static var PHOTOTHERAPY_3_6:int = 236;
		public static var PHOTOTHERAPY_6_12:int = 2612;
		public static var EXCHANGETRANSFUSION:int = 3;
		public static var EXCHANGETRANSFUSION_3_6:int = 336;
		public static var EXCHANGETRANSFUSION_6_12:int = 3612;
		public static var MGDL:String = "mg";
		public static var MMOL:String = "mmol";
		public static var TOLLERANCE_0_6:Number = 0.05;
		public static var TOLLERANCE_6_12:Number = 0.10;
		public static var MMOL2MGDL:Number = 17.09;
		
		public function Nomogram()
		{
			values [23] = [ "40", "80", "130", "230" ];
			values [24] = [ "40", "80", "140", "240" ];
			values [25] = [ "40", "80", "150", "250" ];
			values [26] = [ "40", "80", "160", "260" ];
			values [27] = [ "40", "80", "170", "270" ];
			values [28] = [ "40", "80", "180", "280" ];
			values [29] = [ "40", "80", "190", "290" ];
			values [30] = [ "40", "80", "200", "300" ];
			values [31] = [ "40", "80", "210", "310" ];
			values [32] = [ "40", "80", "220", "320" ];
			values [33] = [ "40", "80", "230", "330" ];
			values [34] = [ "40", "80", "240", "340" ];
			values [35] = [ "40", "80", "250", "350" ];
			values [36] = [ "40", "80", "260", "360" ];
			values [37] = [ "40", "80", "270", "370" ];
		}
		
		private function getValue(eg:int ,hLife:int):Array {
			var arrVal:Array = new Array();
			if (eg == 38) {
				arrVal = getValue38eg(hLife);
			} else {
				var val:Array = values[eg.toString()];
				//var arrVal:Array = new Number[2];
				if (hLife <= 72) {
					arrVal[0] = ((Number(val[2]) - Number(val[0])) / 72)
						* hLife
						+ Number(val[0]);
					arrVal[1] = ((Number(val[3]) - Number(val[1])) / 72)
						* hLife
						+ Number(val[1]);
				} else {
					arrVal[0] = Number(val[2]);
					arrVal[1] = Number(val[3]);
				}
			}
			return arrVal;
		}
		
		
		private function  getValue38eg(hLife:Number):Array {
			var arrVal:Array = new Array();
			
			if (hLife <= 24) {
				arrVal[0] =  (((200 - 100) / 24) * hLife+1) +100;
			} else if (hLife < 96) {
				arrVal[0] =  (((350 - 200) / 72) * (hLife-23)) +200;
			} else if ((hLife >= 96) && (hLife <= 336)) {
				arrVal[0] = 350;
			}
			
			if (hLife <= 42) {
				arrVal[1] = (((450 - 100) / 42) * hLife)+100;
			} else if ((hLife > 42) && (hLife <= 336)) {
				arrVal[1] = 450;
			}
			
			return arrVal;
		}
		
		public function getGraphValue(eg:int, um:String, retList:ArrayCollection=null):ArrayCollection {
			var umisConv:Number=1;  
			if (um==MMOL)
				umisConv = 1;
			else
				umisConv = MMOL2MGDL;
			if (!retList) 
				retList = new ArrayCollection();
			var val:Array = new Array();
			if ((eg >= 23) && (eg <= 38)) {
				for (var gg:int = 0; gg <= 336; gg++) {
					val =  getValue(eg, gg);
					var v:Object={hLife:gg, fotoVal:val[0]/umisConv, exchangeVal:val[1]/umisConv}
					
					retList.addItem(v);
				}
			}
			return retList;
			
		}
		
		public function evaluate(eg:int, hLife:int, biliVal:Number, umis:String):int {
			var evaluation:int = 0;
			var arrVal:Array;
			if (umis==MGDL)
				biliVal = biliVal * MMOL2MGDL;
			
			if ((eg <= 38) && (eg>=23)) {
					arrVal = getValue(eg, hLife);
				if (biliVal < arrVal[0])
					if (biliVal + biliVal * TOLLERANCE_0_6 >= arrVal[0])
						return NORMALVALUE_3_6;
					else if (biliVal + biliVal * TOLLERANCE_6_12 >= arrVal[0])
						return NORMALVALUE_6_12;
					else
						return NORMALVALUE;
				
				if ((biliVal >= arrVal[0]) && biliVal <= arrVal[1])
					
					if (biliVal + biliVal * TOLLERANCE_0_6 >= arrVal[1])
						return PHOTOTHERAPY_3_6;
					else if (biliVal + biliVal * TOLLERANCE_6_12 >= arrVal[1])
						return PHOTOTHERAPY_6_12;
					else
						return PHOTOTHERAPY;
				
				if ((biliVal > arrVal[1]))
					return EXCHANGETRANSFUSION;				
			} else
				evaluation = NONEVALUALBLE;
			return evaluation;
		}
	}
}
