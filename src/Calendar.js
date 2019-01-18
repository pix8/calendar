/**	@name			: @pix8/calendar
*	@author			: j.brincat
*	@description	: Simple Calendar service to return a range of dates given a target date(epoch). Methods accessors return a Promise.
*
********************************************/
import Year from './Year'
import Month from './Month'
import Week from './Week'
import Day from './Day'

import en from './locales/en'


export default class Pix8Calendar {

	constructor(epoch = new Date(), config) {
		console.log("|| Pix8.Calendar service instantiated ||");

		this.locales = en;

		this.calendar = new Array();
	};

	/**
	* Validates a date object
	* @param {Date} date - an object instantiated with the new Date constructor
	* @return {Boolean}
	*/
	isValidDate(date) {
		if(Object.prototype.toString.call(date) !== '[object Date]') {
			return false
		}

		return !isNaN(date.getTime())
	};

	setLocale(customLocale) {

	};

	getCalendarYear(_epoch = new Date()) {

		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");
		
		var year = parseInt(epoch.getUTCFullYear());
		
		if(!this.calendar[year]) this.calendar[year] = new Year(epoch);
				
		return Promise.resolve(this.calendar);

		/*Pix8Calendar.collection[epoch.getUTCFullYear()] = new Year(epoch);

		//returns Array with a Calendar representation(relative to the epoch) supplied as years, months, weeks and dates
		return Promise.resolve(Pix8Calendar.collection);*/
	};

	getCalendarMonth(_epoch = new Date()) {

		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		var year = parseInt(epoch.getUTCFullYear()),
			month = parseInt(epoch.getUTCMonth());

		//TEMP
		var calendar = new Array();

		calendar[year] = new Array(12);
		calendar[year][month] = new Month(epoch); //epoch.toLocaleString();
		console.log(calendar);

		return Promise.resolve(calendar);
	};

	/*getCalendarWeek(_epoch = new Date()) {
		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		var year = parseInt(epoch.getUTCFullYear()),
			month = parseInt(epoch.getUTCMonth()),
			date = parseInt(epoch.getUTCDate());

		//TEMP
		var calendar = new Array();

		calendar[year] = new Array(12);
		calendar[year][month] = new Array(new Month(epoch).length)
		var week = 0;
		calendar[year][month][week] = "TBC";//which week is the date?
		//DEVNOTE: week will need to be split into respective month/year position and 2nd array if partial
		// ie, [...null,null,[null,null,null,null,[0,1]]],[[[2,3,4,5,6],null,null,null,null], null, null...]

		return Promise.resolve(calendar);
	};*/

	/*getCalendarDay(_epoch = new Date()) {
		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		var year = parseInt(epoch.getUTCFullYear()),
			month = parseInt(epoch.getUTCMonth()),
			date = parseInt(epoch.getUTCDate());

		//TEMP
		var calendar = new Array();

		calendar[year] = new Array(12);
		calendar[year][month] = new Array(new Month(epoch).length)
		var week = 0;
		calendar[year][month][week] = "TBC";//which week is the date?

		return Promise.resolve(calendar);
	};*/

	getYear(_epoch = new Date()) {

		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		//returns Array with a Year's worth of dates(relative to the epoch) supplied as months, weeks and dates
		return Promise.resolve(new Year(epoch));
	};

	getMonth(_epoch = new Date()) {

		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		//returns Array with a Month's worth of dates(relative to the epoch) supplied as weeks and dates
		return Promise.resolve(new Month(epoch));
	};

	/*getWeek(_epoch = new Date()) {
		//DEVNOTE: week should be split into two arrays if it is a partial ie.[0,1][2,3,4,5,6]

		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		return Promise.resolve(new Week(epoch));
	};*/

	/*getDay(_epoch = new Date()) {

		var epoch = new Date(_epoch);

		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		return Promise.resolve(new Day(epoch));
	};*/
}
