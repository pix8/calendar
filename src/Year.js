import GregorianDay from './algorithm/Sakamoto'
//import Month from './Month'


export default class Year {

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
		Year.STATICS.LOOKUPTABLE.slice().reduce( (tally, curr, i) => {

			//create month day entries
			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear(this.epoch.year)];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarYearOffset )%7 );

			//splits and groups the month days into clusters of weeks
			calendarYear[i] = calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === Year.config.baseDay) {
					accumulator.push([curr]);
				}else {
					accumulator[l-1].push(curr);
				}

				return accumulator;
			}, []);

			return tally + curr;
		}, 0);

		return calendarYear;
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};

Year.config = {
	baseDay: 0
}
