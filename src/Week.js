import GregorianDay from './algorithm/Sakamoto'
//import Day from './Day'


// export default function Week(_epoch) {

// 	return [0, 1, 2, 3, 4, 5, 6];
// }

//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
	//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.


export default class Week {
//class Week extends day {

	constructor(_epoch) {

		this.baseClass = new BaseClass(_epoch);

		var date = 19;
		var month = 1;
		var year = 2019;

		/*var week = date/7;

		console.log( GregorianDay(year, month, date) );
		console.log(date, "/", month, "/", year, " week = ", Math.ceil(week));*/

		var yearDayTally = BaseClass.LOOKUPTABLE.slice(0, month-1).reduce((tally, daysInMonth, i) => {
			//console.log(this.baseClass.getDaysInMonth(daysInMonth), " :: ", tally);

			return tally + this.baseClass.getDaysInMonth(daysInMonth);
		}, 0);

		console.log("1. year day number = ", this.baseClass.getYearDay(month, date));
		console.log("2. year day number = ", yearDayTally + date);

		//GUESS WHAT. YOU NEED THE YEAR DAY. date needs to be converted to it's year day.

		//return week
			//week number
			//split week at month boundaries
			//DEVNOTE: week should be split into two arrays if it is a partial ie.[0,1][2,3,4,5,6]
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

	getYearDay(month = this.epoch.month, date = this.epoch.date, excludeTargetMonth = false) {
		return BaseClass.LOOKUPTABLE.slice(0, month-1).reduce((tally, daysInMonth, i) => {

			return tally + this.getDaysInMonth(daysInMonth);
		}, excludeTargetMonth ? 0 : date);
	}

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