import GregorianDay from './algorithm/Sakamoto'
//import Day from './Day'

//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
	//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.


export default class Week {
//class Week extends day {

	constructor(_epoch) {

		//MOCK
		//_epoch = new Date(year, month-1, date);

		this.baseClass = new BaseClass(_epoch);
		//var date = 1; 		var month = 1; 		var year = 2019;
		var date = this.baseClass.epoch.date; 		var month = this.baseClass.epoch.month;  		var year = this.baseClass.epoch.year; 

		var dayNumber = this.baseClass.getDayNumber(month, date);
		var weekNo = Math.ceil(dayNumber/7); //DEVNOTE: temp and crude; assumes 1st Jan = 0(Sunday). Not taking into account year offset.

		var day = GregorianDay(year, month, date);
		var daysInMonth = this.baseClass.getDaysInMonth(BaseClass.LOOKUPTABLE[month-1]);

		//console.log(`${_epoch.toLocaleString()} is a ${"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[day]} Day = ${day} Date = ${date}) Week Number = ${weekNo} Day Number = ${this.baseClass.getDayNumber(month, date)}`);

		const WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day
		if(day !== (date-1)%7 && day > date) {
			//console.log(">> partial week segment start");
			//console.log(`${(date%7)}-1=${(date%7)-1} ${day}-${(date%7)-1}=${day-((date%7)-1)}`);

			var foo = WEEK.slice(0, -(WEEK.length-(day-((date%7)-1))) ),
				bar = WEEK.slice(day-((date%7)-1));
			console.log("week :foo: ", foo);
			console.log("week :bar: ", bar);

			return [foo, bar];
		}
		else if( day+(daysInMonth-date) < 6 ) {
			//console.log(">> partial week segment end >");
			var foo = WEEK.slice(0, day+(daysInMonth-date)+1 ),
				bar = WEEK.slice(day+(daysInMonth-date)+1);
			console.log("week :foo: ", foo);
			console.log("week :bar: ", bar);

			return [foo, bar];
		}

		//console.log(">> do nothing")
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


//import GregorianDay from './algorithm/Sakamoto'


class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
			date: parseInt(_epoch.getUTCDate())
		}
		
		this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
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