import GregorianDay from './algorithm/Sakamoto'


export default class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1), //DEVNOTE: get rid of this +1 manipulation
			date: parseInt(_epoch.getUTCDate())
		}
		
		this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
	}

	// get year() {
	// 	return this.year;
	// }

	// get month() {
	// 	return this.month;
	// }

	// get date() {
	// 	return this.date;
	// }

	get day() {
		return GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
	}

	getDayNumber(month = this.epoch.month, date = this.epoch.date, excludeTargetMonth = false) {
		return (
			BaseClass.LOOKUPTABLE.slice(0, month-1).reduce(
				(tally, daysInMonth, i) => tally + this.getDaysInMonth(daysInMonth)
			, excludeTargetMonth ? 0 : date)
		)
	}

	//DEVNOTE: change to work with month values?? and query LOOKUPTABLE directly?
	getDaysInMonth(month) {
		return (Array.isArray(month)) ? month[~~this.isLeapYear()] : month;
	}

	isLeapYear(year = this.epoch.year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}

	static LOOKUPTABLE = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

BaseClass.config = {
	baseDay: 0
}
