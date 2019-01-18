import GregorianDay from './algorithm/Sakamoto'
import Month from './Month'


export default class Year {
//export default class Year extends Month {

	constructor(_epoch) {

		this.baseClass = new BaseClass(_epoch);

		//YEAR
		return (
			BaseClass.LOOKUPTABLE.slice().reduce( (accumulator, daysInMonth, i) => {
				//1.
				var calendarMonth = this.getMonth(this.baseClass.getDaysInMonth(daysInMonth), accumulator.flat(1).length);

				//2.
				accumulator[i] = this.getWeek(calendarMonth);

				return accumulator;
			}, [])
		);
	}

	//Scheduled for demolition -----------------> 1. Month Class
	getMonth(daysInMonth, yearDayTally) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+yearDayTally) + this.baseClass.calendarYearOffset )%7 );
	}
	//Scheduled for demolition -----------------> 1. Month Class

	//Scheduled for demolition -----------------> 2. Week Class
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
	//Scheduled for demolition -----------------> 2. Week Class
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
