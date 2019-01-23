import GregorianDay from './algorithm/Sakamoto'


export default class Epoch {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()), //DEVNOTE: get rid of this +1 manipulation
			date: parseInt(_epoch.getUTCDate())
		}
		
		this.calendarYearOffset = GregorianDay(this.epoch.year, 0, 1);
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
		return (
			Epoch.LOOKUPTABLE.slice(0, this.epoch.month).reduce(
				(tally, daysInMonth, i) => tally + this.getDaysInMonth(i)
			, this.epoch.date)
		)
	}

	get weekNumber() {
		return ( this.calendarYearOffset > 4 ) ? Math.abs(Math.ceil( (this.ordinalDate - (7-this.calendarYearOffset) )/7 )) : Math.ceil( (this.ordinalDate+this.calendarYearOffset)/7 );
	}

	getDaysInMonth(month = this.epoch.month) {
		return (Array.isArray(Epoch.LOOKUPTABLE[month])) ? Epoch.LOOKUPTABLE[month][~~this.isLeapYear()] : Epoch.LOOKUPTABLE[month];
	}

	isLeapYear(year = this.epoch.year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}

	static LOOKUPTABLE = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

Epoch.config = {
	baseDay: 0,
	//weekStartDay: 0,
	//weekNumberStartDay: 4
}
