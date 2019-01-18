import GregorianDay from './algorithm/Sakamoto'
//import Week from './Week'


export default class Month {
//export default class Month extends week {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
			date: parseInt(_epoch.getUTCDate())
		};

		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var calendarMonth = [];

		//epoch origin represent as the year day
		var yearDayTally = Month.STATICS.LOOKUPTABLE.slice(0, this.epoch.month-1).reduce( (tally, curr, i) => {

			return tally + ((Array.isArray(curr)) ? curr[~~Month.isLeapYear(this.epoch.year)] : curr);
		}, 0);		

		//create month day entries
		var daysInMonth = Month.STATICS.LOOKUPTABLE[this.epoch.month-1];
		
		// MONTH common =========================

		if(Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~Month.isLeapYear(this.epoch.year)];

		calendarMonth = [...Array(daysInMonth)].map( (item, j) => ( (j+yearDayTally) + calendarYearOffset )%7 );
		
		return getMonth(calendarMonth);

		// MONTH common =========================
	}

	getMonth(calendarMonth) {
		return (
			
			//splits and groups the month days into clusters of weeks
			calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === Month.config.baseDay) {
					accumulator.push([curr]);
				}else {
					accumulator[l-1].push(curr);
				}

				return accumulator;
			}, [])
		);
	}

	static isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}

	static STATICS = {
		LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	}
}

Month.config = {
	baseDay: 0
}
