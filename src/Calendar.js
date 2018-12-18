/**	@name			: @pix8/calendar
*	@author			: j.brincat
*	@description	: Simple Calendar service to return a range of dates given a target date(epoch). Methods accessors return a Promise.
*
********************************************/
import './Polyfills'
import Moment from 'moment'

import Year from './Year'
import Month from './Month'

import en from './locales/en'


class Pix8Calendar {

	constructor(epoch = new Date().toISOString(), config) {
		console.log("|| Pix8.Calendar service instantiated ||");
		//TODO: validate: check for invalid arg(date) and output empty JSON object in response
		
		let annum = Moment.utc().year(); //epoch.getUTCFullYear();	

	}

	getYear(date = new Date().toISOString()) {
		//TODO: validate: check for invalid arg(date) and output empty JSON object in response
		
		let epoch = new Date(date);

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

		let epoch = Moment(_epoch);

		//returns JSON with a Month's worth of dates(relative to the epoch) supplied as weeks and dates
		return Promise.resolve({
			month: new Month(epoch),
			year: epoch.utc().year(), 			//epoch.getUTCFullYear(),
			index: epoch.utc().month(), 		//epoch.getUTCMonth(), //0-based index
			iso: epoch.utc().format(), 			//new Date(epoch.getUTCFullYear()+"-"+(epoch.getUTCMonth()+1)),
			//STATICS: Pix8Calendar.STATICS
		});
	};

	getWeek(epoch = new Date().toISOString()) {

		//returns JSON with a Month's worth of dates(relative to the epoch) supplied as dates
		return Promise.resolve([0, 1, 2, 3, 4, 5, 6]);
	};
}

export default new Pix8Calendar();
