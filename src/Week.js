import BaseClass from './BaseClass'
//import Day from './Day'


export default class Week extends BaseClass {
//class Week extends day { //--> extends BaseClass??

	constructor(_epoch) {
		
		super(_epoch);

		var {day, date, month, year}  = this;

		const DAYSINMONTH = this.getDaysInMonth(BaseClass.LOOKUPTABLE[month-1]);
		const WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day

		//console.log(`${_epoch.toLocaleString()} is a ${"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[day]} Day = ${day} Date = ${date} Week Number = ${this.weekNumber} Day Number = ${this.getOrdinalDate(month, date)} Offset = ${this.calendarYearOffset}`);

		if(day !== (date-1)%7 && day >= date) {
			//console.log(">> partial week segment start");

			var foo = WEEK.slice(0, -(WEEK.length-(day-((date%7)-1))) ),
				bar = WEEK.slice(day-((date%7)-1));

			return [foo, bar];
		}
		else if( day+(DAYSINMONTH-date) < 6 ) {
			//console.log(">> partial week segment end");
			var foo = WEEK.slice(0, day+(DAYSINMONTH-date)+1 ),
				bar = WEEK.slice(day+(DAYSINMONTH-date)+1);

			return [foo, bar];
		}

		return WEEK;
	}

	// DEVNOTE: REF: Year.js and Month.js implementation
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
}
