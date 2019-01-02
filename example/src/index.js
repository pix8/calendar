/* eslint-disable */

import Calendar from '@pix8/calendar'

//var CalendarService = new Calendar(); //DEVNOTE: currently self-instantiating

var epoch = new Date(),
	input = document.getElementById("date");

var calendar = new Calendar();


input.addEventListener("change", (event) => { //OR old way .onchange = (event) => {}; and .onchange() to trigger

	console.log("EPOCH :: ", event.target.value);

	calendar.getYear(event.target.value).then(data => {
		console.log("Year = ", data);
		
		document.getElementById("payload-getyear").innerHTML = JSON.stringify(data);
	});

	calendar.getMonth(event.target.value).then(data => {
		console.log("Month = ", data);
		
		document.getElementById("payload-getmonth").innerHTML = JSON.stringify(data);
	});

	/*calendar.getWeek(event.target.value).then(data => {
		console.log("Week = ", data);
		
		document.getElementById("payload-getweek").innerHTML = JSON.stringify(data);
	});*/

	/*calendar.getDay(event.target.value).then(data => {
		console.log("Week = ", data);
		
		document.getElementById("payload-getweek").innerHTML = JSON.stringify(data);
	});*/
});


//format = yyyy-MM-dd
input.value = [epoch.getUTCFullYear(), `${"0" + (epoch.getUTCMonth()+1)}`.slice(-2), `${"0" + epoch.getUTCDate()}`.slice(-2)].join("-");

var event = new Event("change", {bubbles: false});
input.dispatchEvent(event);
