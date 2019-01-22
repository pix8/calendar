//import Week from './Week'


export default class Month {
//export default class Month extends Week { //--> extends Day //--> extends BaseClass

	constructor(_epoch) {

		this.baseClass = new BaseClass(_epoch);

		var dayNumber = this.baseClass.getDayNumber(this.baseClass.epoch.month, null, true),
			daysInMonth = BaseClass.LOOKUPTABLE[this.baseClass.epoch.month-1];
		
		//--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)
		
		daysInMonth = this.baseClass.getDaysInMonth(daysInMonth);
		
		//1.
		var calendarMonth = this.getMonth(daysInMonth, dayNumber);
		
		return (
			this.getWeek(calendarMonth)
		);
	}

	getMonth(daysInMonth, dayNumber) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+dayNumber) + this.baseClass.calendarYearOffset )%7 );
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


import GregorianDay from './algorithm/Sakamoto'


class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
			date: parseInt(_epoch.getUTCDate())
		}
		
		this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
	}

	getDayNumber(month = this.epoch.month, date = this.epoch.date, excludeTargetMonth = false) {
		return (
			BaseClass.LOOKUPTABLE.slice(0, month-1).reduce(
				(tally, daysInMonth, i) => tally + this.getDaysInMonth(daysInMonth)
			, excludeTargetMonth ? 0 : date)
		)
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
