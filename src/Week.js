import BaseClass from './BaseClass'
//import Day from './Day'

//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
	//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday(midpoint = 3-thurs-3) i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.
	// the week with the year's first Thursday in it (the formal ISO definition),
	// the week with 4 January in it,
	// the first week with the majority (four or more) of its days in the starting year, and
	// the week starting with the Monday in the period 29 December – 4 January.

export default class Week extends BaseClass {
//class Week extends day { //--> extends BaseClass??

	constructor(_epoch) {

		//MOCK
		//_epoch = new Date(2018, 0, 30);
		
		super(_epoch);

		var {day, date, month, year}  = this;

		const DAYSINMONTH = this.getDaysInMonth(BaseClass.LOOKUPTABLE[month-1]);
		const WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day

		console.log(`${_epoch.toLocaleString()} is a ${"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[day]} Day = ${day} Date = ${date} Week Number = ${this.weekNumber} Day Number = ${this.getOrdinalDate(month, date)} Offset = ${this.calendarYearOffset}`);

		if(day !== (date-1)%7 && day >= date) {
			//console.log(">> partial week segment start");
			//console.log(`${(date%7)}-1=${(date%7)-1} ${day}-${(date%7)-1}=${day-((date%7)-1)}`);

			var foo = WEEK.slice(0, -(WEEK.length-(day-((date%7)-1))) ),
				bar = WEEK.slice(day-((date%7)-1));
			//console.log(`week :foobar:  [${foo}][${bar}]`);

			return [foo, bar];
		}
		else if( day+(DAYSINMONTH-date) < 6 ) {
			//console.log(">> partial week segment end");
			var foo = WEEK.slice(0, day+(DAYSINMONTH-date)+1 ),
				bar = WEEK.slice(day+(DAYSINMONTH-date)+1);
			//console.log(`week :foobar:  [${foo}][${bar}]`);

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
