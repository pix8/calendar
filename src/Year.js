import BaseClass from './BaseClass'
import Month from './Month'


export default class Year extends BaseClass {
//export default class Year extends Month { //--> extends Week //--> extends Day //--> extends BaseClass

	constructor(_epoch) {

		super(_epoch);

		//YEAR
		return (
			BaseClass.LOOKUPTABLE.slice().reduce( (accumulator, daysInMonth, i) => {

				//--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)

				//1.
				var calendarMonth = this.getMonth(daysInMonth[this.isLeapYear()] || daysInMonth, accumulator.flat(2).length);

				//2.
				accumulator[i] = this.getWeek(calendarMonth);
				//console.log(new Date(2019, i, 1).toLocaleString(), " :: " ,new Month(new Date(2019, i, 1)));
				//accumulator[i] = new Month( new Date(2019, i, 1) );

				return accumulator;
			}, [])
		);
	}

	//Scheduled for demolition -----------------> 1. Month Class
	getMonth(daysInMonth, dayNumber) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+dayNumber) + this.calendarYearOffset )%7 );
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
