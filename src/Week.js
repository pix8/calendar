import GregorianDay from './SakamotoMethod'
import Day from './Day'


export default function Week(_epoch) {

	this.epoch = {
		year: parseInt(_epoch.getUTCFullYear(), 10),
		month: parseInt(_epoch.getUTCMonth()+1, 10),
		date: parseInt(_epoch.getUTCDate(), 10)
	};

	var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);

	var calendarWeek = [0, 1, 2, 3, 4, 5, 6];

	return calendarWeek;
	//return (yearDayCount + calendarOffset)%7;
}
