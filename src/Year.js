import GregorianDay from './algorithm/Sakamoto'
import Month from './Month'


class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1), //DEVNOTE: get rid of this +1
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


export default class Year extends BaseClass{
//export default class Year extends Month {

	constructor(_epoch) {

		super(_epoch);

		//YEAR
		return (
			BaseClass.LOOKUPTABLE.slice().reduce( (accumulator, daysInMonth, i) => {

				//--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)

				daysInMonth = this.getDaysInMonth(daysInMonth);

				//1.
				var calendarMonth = this.getMonth(daysInMonth, accumulator.flat(2).length);

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
