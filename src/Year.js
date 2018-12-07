import _ from 'lodash'
import Moment from 'moment'


export default class Year {

	constructor(annum, active) {
		const STATICS = {
			MONTHS: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			MONTHNAME: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			DAYNAME: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		};

		var _self = this;

		this.year = annum;
		this.active = active;

		var primer = setPrimer(this.year, 1, 1);

		var yearday = 0;

		var month = this.month = [];

		//console.log("YEAR >> ", annum);

		_.forEach(STATICS.MONTHS, (item, i, arr) => {

			if(_.isArray(item)) item = item[_self.isLeapYear | 0];

			var day = 0;

			var month1 = [];
			while(day < item) {
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

			//console.log("jb(month) >> ", month1);

			month.push(month1);
		});

		/* YEAR/CLASS METHODS - PRIVATE
		*************************/
		function setPrimer(y, m, d) {

			var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
			y -= m < 3;

			return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + t[m-1] + d) % 7;
		}
	}

	/* YEAR/CLASS METHODS - PUBLIC
	*************************/
	isLeapYear(year) {
		return Boolean( (!(this.year%4) && this.year%100) || !(this.year%400) );
	};
}
