import Epoch from './Epoch'
//import Day from './Day'


export default class Week extends Epoch {
//class Week extends day { //--> extends Epoch??

	constructor(_epoch) {
		
		super(_epoch);

		var {day, date, month, year}  = this;

		const WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day
		const DAYSINMONTH = this.getDaysInMonth();

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
}
