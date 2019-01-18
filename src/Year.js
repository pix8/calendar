import GregorianDay from './algorithm/Sakamoto'
//import Month from './Month'


export default class Year {
//export default class Year extends Month {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
			date: parseInt(_epoch.getUTCDate())
		}
		
		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var calendarYear = [];
		//var calendarYear = [...new Month()]; //How it should eventually be!

		//compose year month entries
		Year.STATICS.LOOKUPTABLE.slice().reduce( (tally, daysInMonth, i) => {

			// MONTH common =========================
			
			//create month day entries
			if(Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~Year.isLeapYear(this.epoch.year)];

			let calendarMonth = [...Array(daysInMonth)].map( (item, j) => ( (j+tally) + calendarYearOffset )%7 );

			//splits and groups the month days into clusters of weeks
			calendarYear[i] = this.getMonth(calendarMonth);

			// MONTH common =========================

			return tally + daysInMonth;
		}, 0);

		return calendarYear;
	}

	getMonth(calendarMonth) {

		return (
			
			//splits and groups the month days into clusters of weeks
			calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === Year.config.baseDay) {
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

Year.config = {
	baseDay: 0
}
