import GregorianDay from './SakamotoMethod'
import en from './locales/en'


export default class Month {

	constructor(_epoch) {
		//console.log("make me a month ", _epoch);		

		this.epoch = {
			year: parseInt(_epoch.utc().year(), 10),			//_epoch.getUTCFullYear(),
			month: parseInt(_epoch.utc().month(), 10),		//_epoch.getUTCMonth() //DEVNOTE: 0-based
			date: ''
		};

		var primer = GregorianDay(this.epoch.year, 1, 1);
		console.log("YEAR init >> ", this.epoch.year, primer, " :: ", en.DAY[primer]);

		var month = [],
			day = 0;

		var yearday = 0;
		for(var i=0, l=this.epoch.month, days; i < l; i++) {

			days = Month.STATICS.LOOKUPTABLE[i];
			if(Array.isArray(days)) days = days[~~this.isLeapYear(this.epoch.year) | 0];
			//console.log(i, " :: ", days)

			yearday += days;
		};

		var item = Month.STATICS.LOOKUPTABLE[this.epoch.month];
		if(Array.isArray(item)) item = item[~~this.isLeapYear(this.epoch.year) | 0];
		while(day < item) {
			month.push( (yearday + primer)%7 );
			day++;
			yearday++;
		};

		//console.log(Month.STATICS.MONTHNAME[this.epoch.month], " :: ", month);

		return month;
	}

	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	};
}

Month.STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};
