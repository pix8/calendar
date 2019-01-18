import GregorianDay from './algorithm/Sakamoto'
//import Week from './Week'


export default class Month {
//export default class Month extends Week { //--> extends Day //--> extends BaseClass

	constructor(_epoch) {

		this.baseClass = new BaseClass(_epoch);

		//epoch origin represent as the year day
		var yearDayTally = BaseClass.LOOKUPTABLE.slice(0, this.baseClass.epoch.month-1).reduce( (tally, curr, i) => {

			return tally + ((Array.isArray(curr)) ? curr[~~BaseClass.isLeapYear(this.baseClass.epoch.year)] : curr);
		}, 0);		

		//create month day entries
		var daysInMonth = BaseClass.LOOKUPTABLE[this.baseClass.epoch.month-1];
		
		if(Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~BaseClass.isLeapYear(this.baseClass.epoch.year)];
		
		//1.
		var calendarMonth = this.getMonth(daysInMonth, yearDayTally);
		
		return this.getWeek(calendarMonth);
	}

	getMonth(daysInMonth, yearDayTally) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+yearDayTally) + this.baseClass.calendarYearOffset )%7 );
	}

	//Scheduled for demolition -----------------> 1. Week Class
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
	//Scheduled for demolition -----------------> 1. Week Class
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
