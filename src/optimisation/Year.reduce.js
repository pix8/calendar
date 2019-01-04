import GregorianDay from './algorithm/Sakamoto'
//import Month from './month'


export default class Year {

	constructor(_epoch) {

		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear(), 10),
			month: parseInt(1, 10),
			date: parseInt(1, 10)
		}

		var calendarOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

		this.calendarYear = [ [...Array(Year.STATICS.LOOKUPTABLE[0])].map( (item, j) => ( j + calendarOffset )%7 ) ];

		Year.STATICS.LOOKUPTABLE.reduce( (tally, curr, i) => {
			//console.log(i, tally, " :: ", curr);

			if(Array.isArray(curr)) curr = curr[~~this.isLeapYear()];

			let calendarMonth = [...Array(curr)].map( (item, j) => ( (j+tally) + calendarOffset )%7 );

			this.calendarYear[i] = calendarMonth;

			return tally + curr;
		});
	}

	isLeapYear() {
		return Boolean( (!(this.epoch.year%4) && this.epoch.year%100) || !(this.epoch.year%400) );
	};
}

Year.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
