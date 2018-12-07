/**	@name			:
*	@author			: j.brincat
*	@build			:
*	@description	: Simple Calendar service to return a range of dates given a source date(epoch). Methods accessors return a Promise.
*
*
*	@dependencies	: lodash(or underscore -> isArray)
* 	@heiracy		: pix8.Calendar
*
********************************************/

import _ from 'lodash'
import Moment from 'moment'

import Year from 'Year'
import Month from 'Month'


//DEVNOTE: objective - given a date will return the calendar day, week, month or year.
// 						will always cache and supply the neighbouring next and previous day, week, month or year.

/* CLASS VARS
*************************/
export const STATICS = {
	MONTHS: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	MONTHNAME: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	DAYNAME: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

	PUBLICHOLIDAYS: [],
	BANKHOLIDAYS: [],
	WEEKENDS: [],
	CLOSED: []
};

class Pix8Calendar {

	/* CONSTRUCTOR
	*************************/
	constructor(epoch = new Date().toISOString(), config) {
		console.log("|| Pix8.Calendar service instantiated ||");
		
		let annum = Moment.utc().year(); //epoch.getUTCFullYear();		
	}

	/* CLASS METHODS
	*************************/
	getYear(date = new Date().toISOString()) {
		let epoch = new Date(date), //check if valid date
			annum = epoch.getUTCFullYear();

		return Promise.resolve(new Year(date));

		// PROMISE
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
		//console.log("the epoch is >> ", _epoch);

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

		return Promise.resolve({
			month: new Month(epoch),
			year: epoch.utc().year(), 			//epoch.getUTCFullYear(),
			index: epoch.utc().month(), 		//epoch.getUTCMonth(), //0-based index
			iso: epoch.utc().format(), 			//new Date(epoch.getUTCFullYear()+"-"+(epoch.getUTCMonth()+1)),
			STATICS: STATICS
		});
	};

	getWeek(epoch = new Date().toISOString()) {
		return Promise.resolve([0, 1, 2, 3, 4, 5, 6]);
	};

	getDay(epoch = new Date().toISOString()) {
		return Promise.resolve([0])
	};


	//creates calendar object
	/*
	this.calendarOld = [new Year(annum-1, false), new Year(annum, true), new Year(annum+1, false)];
	this.calendar = {};

	//would want this to occur in Year class
	this.calendar.year1 = [];
	this.calendar.year1[(annum-1)] = new Year(annum-1, false);
	this.calendar.year1[annum] = new Year(annum, true);
	this.calendar.year1[(annum+1)] = new Year(annum+1, false);

	this.calendar.year2 = [new Year(annum-1, false), new Year(annum, true), new Year(annum+1, false)];

	this.calendar.year3 = {}; //object to avoid associative array which will have no length and no iteration/looping
	this.calendar.year3[annum-1] = new Year(annum-1, false);
	this.calendar.year3[annum] = new Year(annum, true);
	this.calendar.year3[annum+1] = new Year(annum+1, false);

	this.calendar.year = this.calendar.year3; //so thing can start working again
	this.calendar.year = this.calendarOld; //so thing can start working again

	this.calendar.year['"y'+(annum-1)+'"'] = new Year(annum-1, false);
	this.calendar.year['"y'+annum+'"'] = new Year(annum, true);
	this.calendar.year['"y'+(annum+1)+'"'] = new Year(annum+1, false);

	//console.log("service >> ", this.calendar);
	*/
}

export default new Pix8Calendar();
