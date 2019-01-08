import GregorianDay from './algorithm/Sakamoto'
//import Year from './Year'


export default class Calendar {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(_epoch.getUTCMonth()+1, 10),
			date: parseInt(_epoch.getUTCDate(), 10)
		}
		
		var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

		var calendarYear = [];
		//var calendarYear = [...new Month()]; //How it should eventually be!

		//compose year month entries
		Calendar.STATICS.LOOKUPTABLE.slice().reduce( (tally, curr, i) => {

			//create month day entries
			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear(this.epoch.year)];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarYearOffset )%7 );

			//splits and groups the month days into clusters of weeks
			calendarYear[i] = calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === Calendar.config.baseDay) {
					accumulator.push([curr]);
				}else {
					accumulator[l-1].push(curr);
				}

				return accumulator;
			}, []);

			return tally + curr;
		}, 0);

		var calendar = [];
		calendar[this.epoch.year] = calendarYear;
		//console.log("jb :: ", calendar, " :: ", calendar.indexOf(calendarYear) );

		return calendar;
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}
}

Calendar.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};

Calendar.config = {
	baseDay: 0
}
