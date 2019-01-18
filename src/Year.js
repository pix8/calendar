import GregorianDay from './algorithm/Sakamoto'
//import Month from './Month'


export default class Year {
//export default class Year extends Month {

	constructor(_epoch) {

		this.baseClass = new BaseClass(_epoch);

		var calendarYear = [];
		//var calendarYear = [...new Month()]; //How it should eventually be!

		//compose year month entries
		BaseClass.STATICS.LOOKUPTABLE.slice().reduce( (yearDayTally, daysInMonth, i) => {

			if(Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~BaseClass.isLeapYear(this.baseClass.epoch.year)];
			
			var calendarMonth = this.getMonth(daysInMonth, yearDayTally);

			//splits and groups the month days into clusters of weeks
			calendarYear[i] = this.getWeek(calendarMonth);

			return yearDayTally + daysInMonth;
		}, 0);

		return calendarYear;
	}

	//-----------------> 1. Month Class
	getMonth(daysInMonth, yearDayTally) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+yearDayTally) + this.baseClass.calendarYearOffset )%7 );
	}
	//-----------------> 1. Month Class

	//-----------------> 2. Week Class
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
	//-----------------> 2. Week Class
}


class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
			date: parseInt(_epoch.getUTCDate())
		}
		
		this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
	}

	static isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}

	static STATICS = {
		LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	}
}

BaseClass.config = {
	baseDay: 0
}
