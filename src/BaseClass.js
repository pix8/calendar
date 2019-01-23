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

	get year() {
		return this.epoch.year;
	}

	get month() {
		return this.epoch.month;
	}

	get date() {
		return this.epoch.date;
	}

	get day() {
		return GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
	}

	get ordinalDate() {
		return this.getOrdinalDate(this.epoch.month, this.epoch.date);
	}

	get weekNumber() {
		return ( this.calendarYearOffset > 4 ) ? Math.abs(Math.ceil( (this.ordinalDate - (7-this.calendarYearOffset) )/7 )) : Math.ceil( (this.ordinalDate+this.calendarYearOffset)/7 );
	}

	getOrdinalDate(month = this.epoch.month, date = this.epoch.date, excludeTargetMonth = false) {
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
	baseDay: 0,
	firstWeekOfYear: 4
	//First week of the year must contain the date 4th Jan/first thursday (iso8601)
	//first week of the year must contain the date 1st Jan/first friday (middle eastern)
	//first week of the year must contain the date 1st Jan/first saturday (north america/islam)
}
