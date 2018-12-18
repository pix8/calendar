import Moment from 'moment'

import GregorianDay from 'SakamotoMethod'
import en from './locales/en'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			year: 2018,
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		var yearStartDay = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
			
		console.log("YEAR init >> ", this.epoch.year, yearStartDay, " :: ", en.DAY[yearStartDay]);

		this.month = [];

		//NOTE can use Array.reduce() method to sum the LOOKUPTABLE progressively
		var runningTotal = Year.STATICS.LOOKUPTABLE.reduce( (prev, curr) => {
			//if(Array.isArray(prev)) prev = prev[~~this.isLeapYear()];
			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear()];

			var accumalator = prev + curr;
			console.log(prev, " :: ", curr, " = ", accumalator);

			return accumalator;
		});
		console.log("total ", runningTotal);
		//console.log("spread operator >> ", ...Year.STATICS.LOOKUPTABLE )


		Year.STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {
			//TEMP
			var placeholder = [];


			// calibration for presence of leap year
			if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear()];
			console.log(en.MONTH[i], "has", no_OfdaysInMonth,"days");

			//BLOCK 1
			/*var placeholder = new Array();

			var day = 0,
				yearDayCount = 0;
			
			while(day < no_OfdaysInMonth) {
				console.log( yearDayCount, " :: ", yearStartDay );
				
				placeholder.push( (yearDayCount + yearStartDay)%7 );
				
				day++;
				yearDayCount++;
			};*/


			//BLOCK 2
			/*var placeholder = new Array(no_OfdaysInMonth);

			var yearDayCount = 0;

			for(var i = 0, l = placeholder.length; i < l; i++) {
				placeholder[i] = (yearDayCount + yearStartDay)%7;
				yearDayCount++;
			};*/

			//BLOCK 3
			/*var placeholder = new Array(no_OfdaysInMonth);

			var yearDayCount = 0;

			for(var i = placeholder.length; i--;) {
				placeholder[i] = (yearDayCount + yearStartDay)%7;
				yearDayCount++;
			};
			placeholder.reverse();*/

			//BLOCK 4
			/*var placeholder = new Array(no_OfdaysInMonth).call();

			var yearDayCount = 0;

			placeholder.forEach(function(item, i, array) {
				item[i] = (yearDayCount + yearStartDay)%7;
				yearDayCount++;
			});
			*/

			//BLOCK 5
			//var placeholder = Array.apply(null, {length: no_OfdaysInMonth}).map(Function.call, Number);
			// var placeholder = Array.apply(null, {length: 10}).map(function(_, i) {
			// 	return i + 1
			// });

			/*
			//NOTE: there are lots of native methods that return an array. it would be nice to leverage off one by executing it 365/366 times to construct the 0,1,2,3,4,5,6 sequence.
			// bake an array with all days of the year as entries
			var placeholder = [1, 2, 3, 4, 5, 6, 7, 359, 360, 361, 362, 363, 364, 365]; //new Array(no_OfdaysInMonth);

			// use map to manipulate these with modulus of 7 and offset according to the year start date
			placeholder = placeholder.map((yearDay) => {
				return (yearDay + yearStartDay)%7;
			});

			// split the array into their 12 months and pad.
			*/

			
			// svar placeholder = new Array(no_OfdaysInMonth).fill();
			// placeholder.forEach((item, i)=> {
			// 	placeholder[i] = i;
			// })

			//var placeholder = new Array(no_OfdaysInMonth).fill().map( (item, i) => i%7 );
			//var placeholder = [...Array(no_OfdaysInMonth)].map( (item, i) => i%7 );
			// Array(10).fill(1).map((x, y) => x + y)

			


			//var placeholder = [..."foo"];
			//console.log(Array.from('foo'));
			//var placeholder = Array.from( new Array(no_OfdaysInMonth), (item, i) => i%7 );
			// expected output: Array ["f", "o", "o"]
			// expected output: Array [2, 4, 6]

			// https://stackoverflow.com/questions/48962891/fastest-way-to-fill-an-array-with-multiple-value-in-js-can-i-pass-a-some-patter
			// Array.from(new Array(10), (_, i) => i) // [0, 1, 2, 3, ...]


			//use bitwise to represent dates? it would take 3 bits to encode sunday -> monday. then bitwise operators to perform the modulus shift?? can that work?


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
			this.month.push(placeholder);
		});

		console.log("should this be called month? :: ", this.month)
	}

	isLeapYear() {
		return Boolean( (!(this.epoch.year%4) && this.epoch.year%100) || !(this.epoch.year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
