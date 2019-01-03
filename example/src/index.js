/* eslint-disable */

import Calendar from '@pix8/calendar'

//var CalendarService = new Calendar(); //DEVNOTE: currently self-instantiating

var epoch = new Date(),
	input = document.getElementById("date");

var calendar = new Calendar();


input.addEventListener("change", (event) => { //OR old way .onchange = (event) => {}; and .onchange() to trigger

	console.log("EPOCH = ", event.target.value);
	if(!event.target.value.length) return false;

	calendar.getYear(event.target.value).then(data => {
		console.log("Year = ", data);
		
		var el = document.getElementById("payload--getyear");
		if(el !== null) el.innerHTML = JSON.stringify(data);
	});

	calendar.getMonth(event.target.value).then(data => {
		console.log("Month = ", data);
		
		var el = document.getElementById("payload--getmonth")
		if(el !== null) el.innerHTML = JSON.stringify(data);
	});

	calendar.getWeek(event.target.value).then(data => {
		console.log("Week = ", data);
		
		var el = document.getElementById("payload--getweek")
		if(el !== null) el.innerHTML = JSON.stringify(data);
	});

	calendar.getDay(event.target.value).then(data => {
		console.log("Day = ", data);
		
		var el = document.getElementById("payload--getday")
		if(el !== null) el.innerHTML = JSON.stringify(data);
	});

	document.querySelectorAll("span.query__year").forEach( el => el.innerHTML = new Date(event.target.value).getFullYear() );
	document.querySelectorAll("span.query__month").forEach( el => el.innerHTML = calendar.locales.MONTH[ new Date(event.target.value).getMonth() ] );
	document.querySelectorAll("span.query__date").forEach( el => el.innerHTML = new Date(event.target.value).getDate() );
	document.querySelectorAll("span.query__day").forEach( el => el.innerHTML = calendar.locales.DAY[ new Date(event.target.value).getDay() ] );
});


// Pre-populate input with today's date
// format = yyyy-MM-dd
input.value = [epoch.getUTCFullYear(), `${"0" + (epoch.getUTCMonth()+1)}`.slice(-2), `${"0" + epoch.getUTCDate()}`.slice(-2)].join("-");
var event = new Event("change", {bubbles: false});
input.dispatchEvent(event);
