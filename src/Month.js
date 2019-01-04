import GregorianDay from './algorithm/Sakamoto'
import Week from './Week'


export default class Month {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(_epoch.getUTCMonth()+1, 10),
			date: parseInt(_epoch.getUTCDate(), 10)
		};

		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var yearDayTally = Month.STATICS.LOOKUPTABLE.slice(0, this.epoch.month-1).reduce( (tally, curr, i) => {

			return tally + ((Array.isArray(curr)) ? curr[~~this.isLeapYear(this.epoch.year)] : curr);
		}, 0);		

		var daysInMonth = Month.STATICS.LOOKUPTABLE[this.epoch.month-1];
		if(Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~this.isLeapYear(this.epoch.year)];

		return [...Array(daysInMonth)].map( (item, j) => ( (j+yearDayTally) + calendarYearOffset )%7 );
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}
}

Month.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
