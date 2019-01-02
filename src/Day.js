import GregorianDay from 'SakamotoMethod'
import en from './locales/en'


export default function Day(epoch) {
	//check epoch is a valid date
	//break date down in to component parts year, month, date

	return GregorianDay(epoch.year, epoch.month, epoch.date);
}
