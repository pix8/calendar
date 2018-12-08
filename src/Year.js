import Moment from 'moment'

import GregorianDay from 'SakamotoMethod'
import en from './locales/en'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		var primer = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date),
			yearday = 0;
		console.log("YEAR init >> ", this.epoch.year, primer, " :: ", en.DAY[primer]);

		var month = this.month = [];

		Year.STATICS.LOOKUPTABLE.forEach((item, i, arr) => {
			//console.log(en.MONTH[i]);

			if(Array.isArray(item)) item = item[Year.isLeapYear];

			var day = 0;

			var month1 = [];
			while(day < item) {
				//console.log( yearday, primer );
				
				month1.push( (yearday + primer)%7 );
				day++;
				yearday++;
			};

			//pad out the month with filler days
			var padleft = [];
			for(var i = 0, l = month1[0]; i < l; i++) {
				padleft.push(null);
			}
			var padright = [];
			for(var i = month1[month1.length-1], l = 6; i < l; i++) {
				padright.push(null);
			}

			//DEV: quick and dirty; divide into consituent weeks
			//DEVNOTE: don't need to calculate padding seperately with this method
			var monthsweek = [];
			//var week = new Array(7);  //7 in length but nothing to iterate over
			var week = [null, null, null, null, null, null, null];
			month1.forEach((item, i, arr) => {

				week[item] = (i+1);

				if(i+1 == arr.length) {
					//console.log("last ", i+1);
					//week.length = 7; //7 in length but nothing to iterate over
					monthsweek.push(week);
				}

				//while(item) {
				else if(item == 6) {
					monthsweek.push(week);
					week = [null, null, null, null, null, null, null];
				}
			});
			//console.log(month1.length, " :: ", monthsweek);

			month1 = {
				'day': month1,
				'paddingLeft': padleft,
				'paddingRight': padright,

				//'week': [{padding: [], day: []}, {day: []}, {day: []}, {padding: [], day: []}]
				'week': monthsweek
			};

			//console.log("OUTPUT(month) >> ", month1);

			month.push(month1);
		});
	}

	isLeapYear() {
		return Boolean( (!(this.epoch.year%4) && this.epoch.year%100) || !(this.epoch.year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
