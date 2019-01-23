import Epoch from './Epoch'
//import Week from './Week'


export default class Month extends Epoch {
//export default class Month extends Week { //--> extends Day //--> extends Epoch

	constructor(_epoch) {

		super(_epoch);
		
		//--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)
		
		//1.
		var calendarMonth = this.getMonth(this.getDaysInMonth(), this.ordinalDate-this.epoch.date);
		
		return (
			this.getWeek(calendarMonth)
		);
	}

	getMonth(daysInMonth, dayNumber) {

		//MONTHS
		return [...Array(daysInMonth)].map( (item, j) => ( (j+dayNumber) + this.calendarYearOffset )%7 );
	}

	getWeek(calendarMonth) {

		return (
			
			//WEEKS
			//splits and groups the month days into clusters of weeks
			calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === Epoch.config.baseDay) {
					accumulator.push([curr]);
				}else {
					accumulator[l-1].push(curr);
				}

				return accumulator;
			}, [])
		);
	}
}
