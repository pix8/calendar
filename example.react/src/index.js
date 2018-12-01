/* eslint-disable */

import Calendar from '@pix8/calendar'

//var CalendarService = new Calendar();
console.log("CALENDAR :: ", Calendar.getMonth("1980-12").then(data => {
		//console.log(`Month =  ${ data }`);
		console.log("Month = ", data);
	})
);