import GregorianDay from './algorithm/Sakamoto'


export default function Day(_epoch) {

	this.epoch = {
		year: parseInt(_epoch.getUTCFullYear()),
		month: parseInt(_epoch.getUTCMonth()+1),
		date: parseInt(_epoch.getUTCDate())
	};

	var dateDay = _epoch.getUTCDay();
	var calendarDay = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);

	return [calendarDay];
}
