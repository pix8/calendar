import GregorianDay from './SakamotoMethod'
//import Month from './Month'
import en from './locales/en'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		//var calendarYearOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var calendarYear = [];

		Year.STATICS.LOOKUPTABLE.slice().reduce( (tally, curr, i) => {

			// calibration for presence of leap year
			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear(this.epoch.year)];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarYearOffset )%7 );

			calendarYear[i] = calendarMonth;

			return tally + curr;
			//DEVNOTE: return the month as the accumator instead >> leverage Month class to generate structure
		}, 0);

		return calendarYear;
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
