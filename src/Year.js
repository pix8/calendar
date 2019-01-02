import GregorianDay from './SakamotoMethod'
//import Month from './month'
import en from './locales/en'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		var calendarOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

		//--------------------------- 1.
		var t0 = performance.now();
		this.calendarYear1 = [ [...Array(Year.STATICS.LOOKUPTABLE[0])].map( (item, j) => ( j + calendarOffset )%7 ) ];

		Year.STATICS.LOOKUPTABLE.reduce( (tally, curr, i) => {
			//console.log(i, tally, " :: ", curr);

			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear()];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarOffset )%7 );

			this.calendarYear1[i] = calendarMonth;

			return tally + curr;
		});
		//console.log("YEAR.result :version1: ", this.calendarYear1);
		var t1 = performance.now();
		console.log("Variant 1(array reduce) took", (t1 - t0), "milliseconds.");

		//--------------------------- 2.
		var t2 = performance.now();
		this.calendarYear2 = [];

		let yearDayCount2 = 0;

		Year.STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

			// calibration for presence of leap year
			if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear()];

			let calendarMonth2 = new Array();

			let day = 0;
			
			while(day < no_OfdaysInMonth) {
				day = calendarMonth2.push( (yearDayCount2 + calendarOffset)%7 );
				
				yearDayCount2++;
			};

			this.calendarYear2[i] = calendarMonth2;
		});
		//console.log("YEAR.result :version2: ", this.calendarYear2);
		var t3 = performance.now();
		console.log("Variant 2(while loop) took", (t3 - t2), "milliseconds.");

		//--------------------------- 3.
		var t4 = performance.now();
		this.calendarYear3 = [];

		let yearDayCount3 = 0;

		Year.STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

			// calibration for presence of leap year
			if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear()];

			let calendarMonth3 = new Array(no_OfdaysInMonth);

			for(let j = 0, l = calendarMonth3.length; j < l; j++) {
				calendarMonth3[j] = (yearDayCount3 + calendarOffset)%7;
				yearDayCount3++;
			};

			this.calendarYear3[i] = calendarMonth3;
		});
		//console.log("YEAR.result :version3: ", this.calendarYear3);
		var t5 = performance.now();
		console.log("Variant 3(for loop) took", (t5 - t4), "milliseconds.");








		Year.STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {
			/*
			//pad out the month with filler days
			var padleft = [];
			for(var i = 0, l = placeholder[0]; i < l; i++) {
				padleft.push(null);
			}
			var padright = [];
			for(var i = placeholder[placeholder.length-1], l = 6; i < l; i++) {
				padright.push(null);
			}

			//DEV: quick and dirty; divide into consituent weeks
			//DEVNOTE: don't need to calculate padding seperately with this method
			var monthsweek = [];
			//var week = new Array(7);  //7 in length but nothing to iterate over
			var week = [null, null, null, null, null, null, null];
			placeholder.forEach((marker_Date, i, arr) => {
				//console.log(marker_Date);

				week[marker_Date] = (i+1);

				if(i+1 == arr.length) {
					//console.log("last ", i+1);
					//week.length = 7; //7 in length but nothing to iterate over
					monthsweek.push(week);
				}

				//while(marker_Date) {
				else if(marker_Date == 6) {
					monthsweek.push(week);
					week = [null, null, null, null, null, null, null];
				}
			});
			//console.log(placeholder.length, " :: ", monthsweek);

			placeholder = {
				'day': placeholder,
				'paddingLeft': padleft,
				'paddingRight': padright,

				//'week': [{padding: [], day: []}, {day: []}, {day: []}, {padding: [], day: []}]
				'week': monthsweek
			};
			//console.log("OUTPUT(month) >> ", placeholder);
			*/
		});
	}

	isLeapYear() {
		return Boolean( (!(this.epoch.year%4) && this.epoch.year%100) || !(this.epoch.year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
