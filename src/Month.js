import GregorianDay from './SakamotoMethod'
import Week from './Week'
import en from './locales/en'


export default class Month {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(_epoch.getUTCMonth()+1, 10),
			date: parseInt(1, 10)
		};

		//var calendarYearOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var calendarMonth = [],
			no_OfdaysInMonth = Month.STATICS.LOOKUPTABLE[this.epoch.month-1],
			day = 0;

		var yearDayCount = Month.STATICS.LOOKUPTABLE.slice(0, this.epoch.month-1).reduce( (tally, curr, i) => {

			// calibration for presence of leap year
			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear(this.epoch.year)];

			return tally + curr;
		}, 0);		

		// calibration for presence of leap year
		if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear(this.epoch.year)];


		return [...Array(no_OfdaysInMonth)].map( (item, j) => ( (j+yearDayCount) + calendarYearOffset )%7 );

		
		/*while(day < no_OfdaysInMonth) {
			day = calendarMonth.push( (yearDayCount + calendarYearOffset)%7 );

			yearDayCount++;
		};

		return calendarMonth;*/
	}

	getNumberOfDaysInMonth(month) {
		//DEVNOTE: do leap year calibration here;

		return this.STATICS.LOOKUPTABLE[month-1];
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	};
}

Month.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
