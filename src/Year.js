import GregorianDay from './algorithm/Sakamoto'
//import Month from './Month'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(_epoch.getUTCMonth()+1, 10),
			date: parseInt(_epoch.getUTCDate(), 10)
		}

		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var calendarYear = [];
		//var calendarYear = [...Month]; //How it should eventually be!

		Year.STATICS.LOOKUPTABLE.slice().reduce( (tally, curr, i) => {

			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear(this.epoch.year)];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarYearOffset )%7 );

			calendarYear[i] = calendarMonth;

			return tally + curr;
		}, 0);

		return calendarYear;
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
