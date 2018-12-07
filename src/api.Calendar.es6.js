/**	@name			:
*	@author			:
*	@build			:
*	@description	:
*
*
*	@dependencies	: lodash(or underscore -> isArray)
* 	@heiracy		: pix8.Calendar
*
********************************************/
//es6
import Lodash from 'lodash'
import Moment from 'moment'

//commonjs
//const lodash = require('lodash');
//const moment = require('moment');

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
		//console.log("|| Pix8.Calendar service instantiated ||");
		
		let annum = Moment.utc().year(); //epoch.getUTCFullYear();
		
		//console.log("JB >> ", annum);
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

/* ***************************************CLASS: Year *************************************************************/
class Year {

	constructor(annum, active) {
		const STATICS = {
			MONTHS: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			MONTHNAME: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			DAYNAME: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		};

		var _self = this;

		this.year = annum;
		this.active = active;

		var primer = setPrimer(this.year, 1, 1);

		var yearday = 0;

		var month = this.month = [];

		//console.log("YEAR >> ", annum);

		_.forEach(STATICS.MONTHS, (item, i, arr) => {

			if(_.isArray(item)) item = item[_self.isLeapYear | 0];

			var day = 0;

			var month1 = [];
			while(day < item) {
				month1.push( (yearday + primer)%7 );
				day++;
				yearday++;
			};

			//pad out the month with filler days
			var padleft = [];
			for(var i = 0, l = month1[0]; i < l; i++) {
				padleft.push(null);
			}
			var padright = [];
			for(var i = month1[month1.length-1], l = 6; i < l; i++) {
				padright.push(null);
			}

			//DEV: quick and dirty; divide into consituent weeks
			//DEVNOTE: don't need to calculate padding seperately with this method
			var monthsweek = [];
			//var week = new Array(7);  //7 in length but nothing to iterate over
			var week = [null, null, null, null, null, null, null];
			month1.forEach((item, i, arr) => {

				week[item] = (i+1);

				if(i+1 == arr.length) {
					//console.log("last ", i+1);
					//week.length = 7; //7 in length but nothing to iterate over
					monthsweek.push(week);
				}

				//while(item) {
				else if(item == 6) {
					monthsweek.push(week);
					week = [null, null, null, null, null, null, null];
				}
			});
			//console.log(month1.length, " :: ", monthsweek);

			month1 = {
				'day': month1,
				'paddingLeft': padleft,
				'paddingRight': padright,

				//'week': [{padding: [], day: []}, {day: []}, {day: []}, {padding: [], day: []}]
				'week': monthsweek
			};

			//console.log("jb(month) >> ", month1);

			month.push(month1);
		});
	}

	/* YEAR/CLASS METHODS - PRIVATE
	*************************/
	static setPrimer(y, m, d) {

		var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
		y -= m < 3;

		return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + t[m-1] + d) % 7;
	}

	/* YEAR/CLASS METHODS - PUBLIC
	*************************/
	isLeapYear(year) {
		return Boolean( (!(this.year%4) && this.year%100) || !(this.year%400) );
	};
}

/* ***************************************CLASS: Month**********************************************************/
class Month {

	constructor(_epoch) {
		//console.log("make me a month ", _epoch);

		const MONTHS = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var epoch = {
			year: _epoch.utc().year(),		//_epoch.getUTCFullYear(),
			month: _epoch.utc().month()		//_epoch.getUTCMonth() //DEVNOTE: 0-based
		};

		var primer = setPrimer(epoch.year, 1, 1);

		var month = [],
			day = 0;

		var yearday = 0;
		for(var i=0, l=epoch.month, days; i < l; i++) {

			days = MONTHS[i];
			if(_.isArray(days)) days = days[this.isLeapYear(epoch.year) | 0];
			//console.log(i, " :: ", days)

			yearday += days;
		};

		var item = MONTHS[epoch.month];
		if(_.isArray(item)) item = item[this.isLeapYear(epoch.year) | 0];
		while(day < item) {
			month.push( (yearday + primer)%7 );
			day++;
			yearday++;
		};

		//console.log(STATICS.MONTHNAME[epoch.month], " :: ", month);

		return month;

		/* MONTH/CLASS METHODS - PRIVATE
		*************************/
		function setPrimer(y, m, d) {

			var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
			y -= m < 3;

			return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + t[m-1] + d) % 7;
		}
	}

	/* YEAR/CLASS METHODS - PUBLIC
	*************************/
	foobar() {
	}

	/* YEAR/CLASS METHODS - PUBLIC
	*************************/
	isLeapYear(year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	};
}

/* ***************************************CLASS: Week**********************************************************/
class Week {

	constructor(epoch) {

	}

	/* YEAR/CLASS METHODS - PRIVATE
	*************************/
	foobar() {
	}
}

/* ***************************************CLASS: Day**********************************************************/
class Day {

	constructor(epoch) {

	}

	/* YEAR/CLASS METHODS - PRIVATE
	*************************/
	foobar() {
	}
}

//export = exposes public methods/vars

// export default {
// export default function() {
// export const STATICS {
// export default function foobar {
// export default class Pix8Calendar {
// 	return new Pix8Calendar();
// }

export default new Pix8Calendar();
