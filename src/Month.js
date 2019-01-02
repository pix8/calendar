import GregorianDay from './SakamotoMethod'
import Week from './Week'
import en from './locales/en'


export default class Month {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(_epoch.getUTCMonth()+1, 10),		//DEVNOTE: 0-based
			date: parseInt(1, 10)
		};

		var calendarOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

		var calendarMonth = [],
			day = 0;

		var yearDayCount = 0;
		for(var i = 0, l = this.epoch.month, days; i < l; i++) {

			days = Month.STATICS.LOOKUPTABLE[i];
			if(Array.isArray(days)) days = days[ ~~this.isLeapYear(this.epoch.year) ];
			//console.log(i, " :: ", days)

			yearDayCount += days;
		};

		var no_OfdaysInMonth = Month.STATICS.LOOKUPTABLE[this.epoch.month-1];
		
		if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear()];
		
		while(day < no_OfdaysInMonth) {
			day = calendarMonth.push( (yearDayCount + calendarOffset)%7 );

			yearDayCount++;
		};

		return calendarMonth;
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	};
}

Month.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
