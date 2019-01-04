import GregorianDay from './algorithm/Sakamoto'
//import Month from './month'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		var calendarOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

		this.calendarYear = [];

		let yearDayCount = 0;

		Year.STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

			// calibration for presence of leap year
			if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~this.isLeapYear()];

			let calendarMonth = new Array(no_OfdaysInMonth);

			for(let j = 0, l = calendarMonth.length; j < l; j++) {
				calendarMonth[j] = (yearDayCount + calendarOffset)%7;
				yearDayCount++;
			};

			this.calendarYear[i] = calendarMonth;
		});
	}

	isLeapYear() {
		return Boolean( (!(this.epoch.year%4) && this.epoch.year%100) || !(this.epoch.year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
