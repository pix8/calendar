import GregorianDay from './algorithm/Sakamoto'


class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
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


//import Day from './Day'

//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
	//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.


export default class Week extends BaseClass {
//class Week extends day {

	constructor(_epoch) {

		//MOCK
		//_epoch = new Date(2019, 0, 22);

		super(_epoch);

		var { date, month, year } = this.epoch;

		var dayNumber = this.getDayNumber(this.epoch.month, this.epoch.date);
		var weekNo = Math.ceil(dayNumber/7); //DEVNOTE: temp and crude; assumes 1st Jan = 0(Sunday). Not taking into account year offset or ISO standard

		//var day = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
		var daysInMonth = this.getDaysInMonth(BaseClass.LOOKUPTABLE[this.epoch.month-1]);

		console.log(`${_epoch.toLocaleString()} is a ${"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[this.day]} Day = ${this.day} Date = ${this.epoch.date}) Week Number = ${weekNo} Day Number = ${this.getDayNumber(this.epoch.month, this.epoch.date)}`);

		const WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day
		if(this.day !== (this.epoch.date-1)%7 && this.day > this.epoch.date) {
			console.log(">> partial week segment start");
			//console.log(`${(this.epoch.date%7)}-1=${(this.epoch.date%7)-1} ${this.day}-${(this.epoch.date%7)-1}=${this.day-((this.epoch.date%7)-1)}`);

			var foo = WEEK.slice(0, -(WEEK.length-(this.day-((this.epoch.date%7)-1))) ),
				bar = WEEK.slice(this.day-((this.epoch.date%7)-1));
			console.log(`week :foobar:  [${foo}][${bar}]`);

			return [foo, bar];
		}
		else if( this.day+(daysInMonth-this.epoch.date) < 6 ) {
			console.log(">> partial week segment end >");
			var foo = WEEK.slice(0, this.day+(daysInMonth-this.epoch.date)+1 ),
				bar = WEEK.slice(this.day+(daysInMonth-this.epoch.date)+1);
			console.log(`week :foobar:  [${foo}][${bar}]`);

			return [foo, bar];
		}

		console.log(">> do nothing")
		return WEEK;
			//week number
			//week number indication and way to give epoch context
			//Week construct would have to abide by the config.baseday for construction
	}

	getWeek(calendarMonth) {
		
		return (
			
			//WEEKS
			//splits and groups the month days into clusters of weeks
			calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === BaseClass.config.baseDay) {
					accumulator.push([curr]);
				}else {
					accumulator[l-1].push(curr);
				}

				return accumulator;
			}, [])
		);
	}
}


