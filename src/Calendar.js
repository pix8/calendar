/**	@name			: @pix8/calendar
*	@author			: j.brincat
*	@description	: Simple Calendar service to return a range of dates given a target date(epoch). Methods accessors return a Promise.
*
********************************************/
import './Polyfills'

import Year from './Year'
import Month from './Month'
import Week from './Week'
import Day from './Day'

import en from './locales/en'


export default class Pix8Calendar {

	constructor(epoch = new Date().toISOString(), config) {
		console.log("|| Pix8.Calendar service instantiated ||");

		this.locales = en;
	}

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
	}

	setLocale(customLocale) {
	}

	getYear(_epoch = new Date().toISOString()) {

		let epoch = new Date(_epoch);

		//TODO: validate: check for invalid arg(date) and output empty JSON object in response
		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		//returns JSON with a Year's worth of dates(relative to the epoch) supplied as months, weeks and dates
		return Promise.resolve(new Year(epoch));

		// return new Promise(
		// 	(resolve, reject) => {
		// 		//RESOLVE
		// 		if(valid date) {
		// 			resolve(new Year(date));
				
		// 		//REJECT
		// 		}else {
		// 			const msg = new Error('Failed to create year: invalid date');
		// 			reject(msg);
		// 		}
		// 	}
		// );
	};

	getMonth(_epoch = new Date().toISOString()) {

		let epoch = new Date(_epoch);

		//TODO: validate: check for invalid arg(date) and output empty JSON object in response
		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		//returns JSON with a Month's worth of dates(relative to the epoch) supplied as weeks and dates
		return Promise.resolve(new Month(epoch));

		// return new Promise( (resolve) => {
		// 	setTimeout(function() {
		// 		console.log("2 secs");

		// 		let month = {
		// 			month: new Month(epoch),
		// 			year: epoch.getUTCFullYear(),
		// 			index: epoch.getUTCMonth(),
		// 			label: STATICS.MONTHNAME[epoch.getUTCMonth()],
		// 			iso: new Date(epoch.getUTCFullYear()+"-"+(epoch.getUTCMonth()+1))
		// 		};

		// 		resolve(month);
		// 	}, 2000);
		// });
	};

	getWeek(_epoch = new Date().toISOString()) {

		let epoch = new Date(_epoch);

		//TODO: validate: check for invalid arg(date) and output empty JSON object in response
		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		return Promise.resolve(new Week(epoch));
	};

	getDay(_epoch = new Date().toISOString()) {

		let epoch = new Date(_epoch);

		//TODO: validate: check for invalid arg(date) and output empty JSON object in response
		if(!this.isValidDate(epoch))
			throw TypeError("Pix8Calendar: Query is not a valid date");

		return Promise.resolve(new Day(epoch));
	};
}

//export default new Pix8Calendar();
