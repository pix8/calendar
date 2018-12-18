import Moment from 'moment'

import GregorianDay from './SakamotoMethod'
import en from './locales/en'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		var calendarOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

		this.calendarYear = [];

		//speedtests 1. for loop(increment) 2. while loop 3. native foreach 4. this method(no spread operator) 5. es5 implemenation of this 6. Array.from

		Year.STATICS.LOOKUPTABLE.reduce( (tally, curr, i) => {
			//console.log(i, tally, " :: ", curr);

			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear()];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarOffset )%7 );

			this.calendarYear[i] = calendarMonth;

			return tally + curr;
		});

		//console.log("YEAR.result :version1: ", this.calendarYear);


		this.calendarYear2 = [];

		let yearDayCount = 0;

		Year.STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {			

			// calibration for presence of leap year
			if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear()];

			let calendarMonth = new Array();

			let day = 0;
			
			while(day < no_OfdaysInMonth) {
				calendarMonth.push( (yearDayCount + calendarOffset)%7 );
				
				day++;
				yearDayCount++;
			};

			/*var placeholder = new Array(no_OfdaysInMonth);

			var yearDayCount = 0;

			for(var i = 0, l = placeholder.length; i < l; i++) {
				placeholder[i] = (yearDayCount + calendarOffset)%7;
				yearDayCount++;
			};*/



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

			this.calendarYear2[i] = calendarMonth;
		});

		//console.log("YEAR.result :version2: ", this.calendarYear2);
	}

	isLeapYear() {
		return Boolean( (!(this.epoch.year%4) && this.epoch.year%100) || !(this.epoch.year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
