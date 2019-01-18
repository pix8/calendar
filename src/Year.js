import GregorianDay from './algorithm/Sakamoto'
//import Month from './Month'


export default class Year {
//export default class Year extends Month {

	constructor(_epoch) {

		this.baseClass = new BaseClass(_epoch);

		var calendarYear = [];
		//var calendarYear = [...new Month()]; //How it should eventually be!

		//compose year month entries
		BaseClass.STATICS.LOOKUPTABLE.slice().reduce( (tally, daysInMonth, i) => {

			// MONTH common =========================
			if(Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~BaseClass.isLeapYear(this.baseClass.epoch.year)];

			var calendarMonth = [...Array(daysInMonth)].map( (item, j) => ( (j+tally) + this.baseClass.calendarYearOffset )%7 );
			// MONTH common =========================

			//splits and groups the month days into clusters of weeks
			calendarYear[i] = this.getMonth(calendarMonth);

			return tally + daysInMonth;
		}, 0);

		return calendarYear;
	}

	//-----------------> 1. Month Class
	getMonth(calendarMonth) {

		return (
			
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
	//-----------------> 1. Month Class
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
