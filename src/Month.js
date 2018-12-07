import _ from 'lodash';


export default class Month {

	constructor(_epoch) {
		//console.log("make me a month ", _epoch);

		const STATICS = {
			MONTHS: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			MONTHNAME: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			DAYNAME: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		};

		var epoch = {
			year: _epoch.utc().year(),		//_epoch.getUTCFullYear(),
			month: _epoch.utc().month()		//_epoch.getUTCMonth() //DEVNOTE: 0-based
		};

		var primer = setPrimer(epoch.year, 1, 1);

		var month = [],
			day = 0;

		var yearday = 0;
		for(var i=0, l=epoch.month, days; i < l; i++) {

			days = STATICS.MONTHS[i];
			if(_.isArray(days)) days = days[this.isLeapYear(epoch.year) | 0];
			//console.log(i, " :: ", days)

			yearday += days;
		};

		var item = STATICS.MONTHS[epoch.month];
		if(_.isArray(item)) item = item[this.isLeapYear(epoch.year) | 0];
		while(day < item) {
			month.push( (yearday + primer)%7 );
			day++;
			yearday++;
		};

		//console.log(STATICS.MONTHNAME[epoch.month], " :: ", month);

		return month;

		/* MONTH/CLASS METHODS - PRIVATE
		*************************/
		function setPrimer(y, m, d) {

			var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
			y -= m < 3;

			return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + t[m-1] + d) % 7;
		}
	}

	/* YEAR/CLASS METHODS - PUBLIC
	*************************/
	foobar() {
	}

	/* YEAR/CLASS METHODS - PUBLIC
	*************************/
	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	};
}
