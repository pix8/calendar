/* eslint-disable */

import Calendar from '@pix8/calendar'

//var CalendarService = new Calendar();

var input = document.getElementById("date"); //.onchange = (event) => {};

input.addEventListener("change", (event) => {
	
	console.log(event.target.value);

	Calendar.getMonth(event.target.value).then(data => {
		console.log("Month = ", data);
		
		document.getElementById("payload").innerHTML = JSON.stringify(data);
	});
});
