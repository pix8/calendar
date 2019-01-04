import GregorianDay from './algorithm/Sakamoto'


export default function Day(_epoch) {

	this.epoch = {
		year: parseInt(_epoch.getUTCFullYear(), 10),
		month: parseInt(_epoch.getUTCMonth()+1, 10),
		date: parseInt(_epoch.getUTCDate(), 10)
	};

	var dateDay = _epoch.getUTCDay();
	var calendarDay = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

	return [calendarDay];
}
