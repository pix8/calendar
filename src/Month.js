import BaseClass from './BaseClass'
import Week from './Week'


export default class Month extends BaseClass {
//export default class Month extends Week { //--> extends Day //--> extends BaseClass

	constructor(_epoch) {

		super(_epoch);

		var dayNumber = this.getOrdinalDate(this.epoch.month, null, true),
			daysInMonth = BaseClass.LOOKUPTABLE[this.epoch.month-1];
		
		//--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)
		
		daysInMonth = this.getDaysInMonth(daysInMonth);
		
		//1.
		var calendarMonth = this.getMonth(daysInMonth, dayNumber);
		
		return (
			this.getWeek(calendarMonth)
		);
	}

	getMonth(daysInMonth, dayNumber) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+dayNumber) + this.calendarYearOffset )%7 );
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
