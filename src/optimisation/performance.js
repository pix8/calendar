//======== CONFIG

const STATICS = {
	LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};

var epoch = {
	year: parseInt(2018, 10),
	month: parseInt(1, 10),
	date: parseInt(1, 10)
}

function GregorianDay(y, m, d) {
	const offset = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
	y -= Number(m < 3);
	return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + offset[m-1] + d) % 7;
}

function isLeapYear() {
		return Boolean( (!(epoch.year%4) && epoch.year%100) || !(epoch.year%400) );
}



//=======================
//=======================



//======== TEST 1 - while loop that imitates for loop

var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~isLeapYear()];

	var placeholder = new Array();

	var day = 0,
		yearDayCount = 0;
	
	while(day < no_OfdaysInMonth) {		
		placeholder.push( (yearDayCount + yearStartDay)%7 );
		
		day++;
		yearDayCount++;
	};

	month.push(placeholder);
});


//=========== TEST 2 - for loop

var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~isLeapYear()];

	var placeholder = new Array(no_OfdaysInMonth);

	var yearDayCount = 0;
			
	for(var i = 0, l = placeholder.length; i < l; i++) {
		placeholder[i] = (yearDayCount + yearStartDay)%7;
		yearDayCount++;
	};

	month.push(placeholder);
});

//=========== TEST 2 - for loop ()

var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~isLeapYear()];

	var placeholder = new Array(no_OfdaysInMonth);

	var yearDayCount = 0;
			
	for(var i = 0, l = placeholder.length; i < l; ++i) {
		placeholder[i-1] = (yearDayCount + yearStartDay)%7;
		yearDayCount++;
	};

	month.push(placeholder);
});


//=========== TEST 3 - reverse for loop

var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~isLeapYear()];

	var placeholder = new Array(no_OfdaysInMonth);
	
	var yearDayCount = 0;
			
	for(var i = placeholder.length; i--;) {
		placeholder[i] = (yearDayCount + yearStartDay)%7;
		yearDayCount++;
	};
	placeholder.reverse();

	month.push(placeholder);
});

//=========== TEST 4 - native forEach

var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	if(Array.isArray(no_OfdaysInMonth)) no_OfdaysInMonth = no_OfdaysInMonth[~~isLeapYear()];

	var placeholder = new Array(no_OfdaysInMonth);
	
	var yearDayCount = 0;
			
	placeholder.forEach(function(item, i, array) {
		item[i] = (yearDayCount + yearStartDay)%7;
		yearDayCount++;
	});

	month.push(placeholder);
});

//=========== TEST 5 - clever shit es5
var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	var placeholder = Array.apply(null, {length: no_OfdaysInMonth}).map(Function.call, Number);

	// Array.apply(null, {length: N}).map(function(value, index){
	// 	return index + 1;
	// });

	month.push(placeholder);
});

//=========== TEST 6 - clever shit es6
var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	var placeholder = Array.from(new Array(no_OfdaysInMonth), (val,index) => index);
	//Array.from(new Array(N),(val,index)=>index+1);

	month.push(placeholder);
});

//=========== TEST 7 - more clever shit es6
var yearStartDay = GregorianDay(epoch.year, epoch.month, epoch.date);

var month = [];

STATICS.LOOKUPTABLE.forEach((no_OfdaysInMonth, i, arr) => {

	var placeholder = Array.from( Array(no_OfdaysInMonth).keys() );

	month.push(placeholder);
});

//=========== TEST 8 - clever shit with a for loop
for(var i = array.length ; i > 0 ; arrayCopy[--i] = array[i]);

//=========== TEST 8 - clever shit with a for loop
for(var i = array.length ;i-- ; arrayCopy[i] = array[i]);



