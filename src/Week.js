import GregorianDay from './SakamotoMethod'
import Day from './Day'
import en from './locales/en'


export default function Week(_epoch) {

	this.epoch = {
		year: parseInt(_epoch.getUTCFullYear(), 10),
		month: parseInt(_epoch.getUTCMonth()+1, 10),
		date: parseInt(1, 10)
	};

	var calendarOffset = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

	var calendarWeek = [];


	return calendarWeek;

	/*var day = Day(epoch);

	//create array.
	//fill in the gaps to make a week
	//return week

	return (yearDayCount + calendarOffset)%7*/
}