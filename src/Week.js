import GregorianDay from './algorithm/Sakamoto'
//import Day from './Day'


// export default function Week(_epoch) {

// 	return [0, 1, 2, 3, 4, 5, 6];
// }

//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
	//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.


export default class Week {
//class Week extends day {

	constructor(_epoch) {

		//MOCK
		var date = 1; 		var month = 1; 		var year = 2018;
		_epoch = new Date(year, month-1, date);

		this.baseClass = new BaseClass(_epoch);

		var dayNumber = this.baseClass.getDayNumber(month, date);
		var weekNo = Math.ceil(dayNumber/7); //DEVNOTE: temp and crude; assumes 1st Jan = 0(Sunday). Not taking into account year offset.

		//if partial construct dual arrays(+week number and epoch context)
		var day = GregorianDay(year, month, date);
		var daysInMonth = this.baseClass.getDaysInMonth(BaseClass.LOOKUPTABLE[month-1]);

		var week = [];

		console.log(`${new Date(year, month-1, date).toLocaleString()} is a ${"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[day]} day = ${day} date = ${date})`);
		console.log(`Week number = ${weekNo} Day number = ${this.baseClass.getDayNumber(month, date)}`);
		
		// console.log(day, " :: ", date, "=", (day > date));
		// console.log(day, " :: ", date-1, " :: ", (date-1)%7, "=", (day !== (date-1)%7));

		// console.log(`days in month :DiM: ${daysInMonth} :mod: ${daysInMonth%7} :day: ${day} :date: ${date}`);
		// console.log( `${day} :: ${daysInMonth} - ${date} = ${daysInMonth-date}`,  (day+(daysInMonth-date) < 6) )

		const WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day
		if(day !== (date-1)%7 && day > date) {
			console.log(">> incomplete week segment start")
			var foo = WEEK.slice(day);
			var bar = WEEK.slice(0, -(WEEK.length-day) );
			// console.log("week :foo: ", foo);
			// console.log("week :bar: ", bar);
			// console.log("week :splice: ", WEEK.slice().splice(0, day) );

			return [bar, foo];
		}
		else if( day+(daysInMonth-date) < 6 ) {
			console.log(">> incomplete week segment end")
			var foo = WEEK.slice(day);
			var bar = WEEK.slice(0, -(WEEK.length-day) );

			return [foo, bar];
		}

		console.log(">> do nothing")
		return WEEK; //+ need week number indication and way to give epoch context

		/*if(foo.length < 7 && date > 1 && date < 8 ) {
			console.log(">> incomplete week segment start")
		}else if(foo.length < 7 && date > 31-(31%7)) {
			console.log(">> incomplete week segment end")
		}else {
			console.log(">> do nothing")
		}*/

		/*if(!bar.length) {
			return [foo];
		};*/

		var week = [];
		for(var i = day, l = week.length; i < 7; ++i) {
			week.push(i);
		};
		console.log(week);

		//return week
			//week number DONE
			//split week at month boundaries DONE
			//DEVNOTE: week should be split into two arrays if it is a partial ie.[0,1][2,3,4,5,6] DONE
			//Week construct would have to abide by the config.baseday for construction

/*
for jan
	at date 28 the day number is 6
	31 days in the month
	31-28(31%7) = 3 days left 7-(6+1) = 0 remaining on the clock
	7-(6+1) = 0. 0 != 3. Not enough days left to make another 7 day pass

	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	27th - 	3	 	5		6			4					5+4 = 9
	28th - 	3	 	6		0			3					6+3 = 9
	29th - 	3		0		1			2					0+2 = 2
	30th - 	3		1 		2 			1(more day left)	1+1 = 2
	31th - 	3		2		3 			0					2+0 = 2

for feb
	last perfect with feb was 2015

	at date 28 the day number is 2
	28 days in the month
	28-28(28%7) = 0 days left and 7-(2+1) = 4 remaining on the clock
	7-(2+1) = 4. 4 != 0. Not enough days left to complete the 7 day week.

	28 - 2
	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	25th - 	0		6		4			3			6+3 = 9
	26th - 	0		0		5			2			0+2 = 2
	27th - 	0		1 		6 			1			1+1 = 2
	28th - 	0		2		0 			0			2+0 = 2

	28 days in feb. for feb to end at week end it must start at first week day for perfect 4 week spread.
	28+0 = 28
	28%7 = 0. perfect fit.

	in 2017 feb starts weds which is day number 3. this shifts the end day by 3 days forward of perfect fit.
	28+3 = 31
	31%7 = 3. incomplete week

	in 2015 feb starts sun which is day number 0.
	28+0 = 28
	28%7 = 0. perfect fit.

for march 2017
	at date 28 the day number is 2
	31 days in the month
	31-28(31%7) = 3 days left and 7-(2+1) = 4 remaining on the clock
	7-(2+1) = 4. 4 != 3. Not enough days left to complete the 7 day week.

	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	1st - 	3	 	3		1			30			3+30 = 33
	2nd - 	3	 	4		2			29			4+29 = 33
	3rd - 	3	 	5		3			28			5+28 = 33
	4th - 	3	 	6		4			27			6+27 = 33
	5th - 	3	 	0		5			26			0+26 = 26
	6th - 	3	 	1		6			25			1+25 = 26
	7th - 	3	 	2		0			24			2+24 = 26
	9th - 	3	 	3		1			23			3+23 = 26
	10th - 	3	 	4		2			22			4+22 = 26
	11th - 	3	 	5		3			21			5+21 = 26
	12th - 	3	 	6		4			20			6+20 = 26
	13th - 	3	 	0		5			19			0+19 = 19
	14th - 	3	 	1		6			18			1+18 = 19
	15th - 	3	 	2		0			17			2+17 = 19
	16th - 	3	 	3		1			16			3+16 = 19
	17th - 	3	 	4		2			15			4+15 = 19
	18th - 	3	 	5		3			14			5+14 = 19
	19th - 	3	 	6		4			13			6+13 = 19
	20th - 	3	 	0		5			12			0+12 = 12
	21st - 	3	 	1		6			11			1+11 = 12
	22nd - 	3	 	2		0			10			2+10 = 12
	23rd - 	3	 	3		1			9			3+9 = 12
	24th - 	3	 	4		2			8			4+8 = 12
	24th - 	3	 	5		3			7			5+7 = 12
	25th - 	3	 	6		4			6			6+6 = 12
	26th - 	3	 	0		5			5			0+5 = 5
	27th - 	3	 	1		6			4			1+4 = 5
	28th - 	3	 	2		0			3			2+3 = 5
	29th - 	3		3		1			2			3+2 = 5
	30th - 	3		4 		2 			1			4+1 = 5
	31th - 	3		5		3 			0			5+0 = 5

for sept 2017
	at date 28 the day number is 4
	30 days in the month
	30-28(30%7) = 2 days left and 7-(4+1) = 2 remaining on th clock
	7-(4+1) = 2. 0 == 0. 2 days left 2 days remaining. month ends on completed week.
	
	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	1st - 	2	 	5		1			29			5+29 = 34
	2nd - 	2	 	6		2			28			6+28 = 34
	3rd - 	2	 	0		3			27			0+27 = 27
	4th - 	2	 	1		4			26			1+26 = 27
	5th - 	2	 	2		5			25			2+25 = 27
	6th - 	2	 	3		6			24			3+24 = 27
	7th - 	2	 	4		0			23			4+23 = 27
	9th - 	2	 	5		1			22			5+22 = 27
	10th - 	2	 	6		2			21			6+21 = 27
	11th - 	2	 	0		3			20			0+20 = 20
	12th - 	2	 	1		4			19			1+19 = 20
	13th - 	2	 	2		5			18			2+18 = 20
	14th - 	2	 	3		6			17			3+17 = 20
	15th - 	2	 	4		0			16			4+16 = 20
	16th - 	2	 	5		1			15			5+15 = 20
	17th - 	2	 	6		2			14			6+14 = 20
	18th - 	2	 	0		3			13			0+13 = 13
	19th - 	2	 	1		4			12			1+12 = 13
	20th - 	2	 	2		5			11			2+11 = 13
	21st - 	2	 	3		6			10			3+10 = 13
	22nd - 	2	 	4		0			9			4+9 = 13
	23rd - 	2	 	5		1			8			5+8 = 13
	24th - 	2	 	6		2			7			6+7 = 13
	24th - 	2	 	0		3			6			0+6 = 6
	25th - 	2	 	1		4			5			1+5 = 6
	26th - 	2	 	2		5			4			2+4 = 6
	27th - 	2	 	3		6			3			3+3 = 6
	28th - 	2		4 		0			2 			4+2 = 6  (&& DiM7 <= DATE%7)maybe
	29th - 	2	 	5		1			1			5+1 = 6
	30th - 	2	 	6 		2			0			6+0 = 6

for march 2018
	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	1st - 	3	 	4		1			30			4+30 = 34
	2nd - 	3	 	5		2			29			5+29 = 34
	3rd - 	3	 	6		3			28			6+28 = 34
	4th - 	3	 	0		4			27			0+27 = 27
	5th - 	3	 	1		5			26			1+26 = 27
	6th - 	3	 	2		6			25			2+25 = 27
	7th - 	3	 	3		0			24			3+24 = 27
	9th - 	3	 	4		1			23			4+23 = 27
	10th - 	3	 	5		2			22			5+22 = 27
	11th - 	3	 	6		3			21			6+21 = 27
	12th - 	3	 	0		4			20			0+20 = 20
	13th - 	3	 	1		5			19			1+19 = 20
	14th - 	3	 	2		6			18			2+18 = 20
	15th - 	3	 	3		0			17			3+17 = 20
	16th - 	3	 	4		1			16			4+16 = 20
	17th - 	3	 	5		2			15			5+15 = 20
	18th - 	3	 	6		3			14			6+14 = 20
	19th - 	3	 	0		4			13			0+13 = 13
	20th - 	3	 	1		5			12			1+12 = 13
	21st - 	3	 	2		6			11			2+11 = 13
	22nd - 	3	 	3		0			10			3+10 = 13
	23rd - 	3	 	4		1			9			4+9 = 13
	24th - 	3	 	5		2			8			5+8 = 13
	24th - 	3	 	6		3			7			6+7 = 13
	25th - 	3	 	0		4			6			0+6 = 6
	26th - 	3	 	1		5			5			1+5 = 6
	27th - 	3	 	2		6			4			2+4 = 6
	28th - 	3		3 		0			3 			3+3 = 6
	29th - 	3	 	4		1			2			4+2 = 6
	30th - 	3	 	5 		2			1			5+1 = 6
	31st - 	3	 	6 		2			0			6+0 = 6

for june 2018
	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	1st - 	2	 	5		1			29			5+29 = 34
	2nd - 	2	 	6		2			28			6+28 = 34
	3rd - 	2	 	0		3			27			0+27 = 27
	4th - 	2	 	1		4			26			1+26 = 27
	5th - 	2	 	2		5			25			2+25 = 27
	6th - 	2	 	3		6			24			3+24 = 27
	7th - 	2	 	4		0			23			4+23 = 27
	9th - 	2	 	5		1			22			5+22 = 27
	10th - 	2	 	6		2			21			6+21 = 27
	11th - 	2	 	0		3			20			0+20 = 20
	12th - 	2	 	1		4			19			1+19 = 20
	13th - 	2	 	2		5			18			2+18 = 20
	14th - 	2	 	3		6			17			3+17 = 20
	15th - 	2	 	4		0			16			4+16 = 20
	16th - 	2	 	5		1			15			5+15 = 20
	17th - 	2	 	6		2			14			6+14 = 20
	18th - 	2	 	0		3			13			0+13 = 13
	19th - 	2	 	1		4			12			1+12 = 13
	20th - 	2	 	2		5			11			2+11 = 13
	21st - 	2	 	3		6			10			3+10 = 13
	22nd - 	2	 	4		0			9			4+9 = 13
	23rd - 	2	 	5		1			8			5+8 = 13
	24th - 	2	 	6		2			7			6+7 = 13
	24th - 	2	 	0		3			6			0+6 = 6
	25th - 	2	 	1		4			5			1+5 = 6
	26th - 	2	 	2		5			4			2+4 = 6
	27th - 	2	 	3		6			3			3+3 = 6
	28th - 	2		4 		0			2 			4+2 = 6
	29th - 	2	 	5		1			1			5+1 = 6
	30th - 	2	 	6 		2			0			6+0 = 6

for feb 2020(leap year)
	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	1st - 	1	 	6		1			28			6+28 = 34
	2nd - 	1	 	0		2			27			0+27 = 27
	3rd - 	1	 	1		3			26			1+26 = 27
	4th - 	1	 	2		4			25			2+25 = 27
	5th - 	1	 	3		5			24			3+24 = 27
	6th - 	1	 	4		6			23			4+23 = 27
	7th - 	1	 	5		0			22			5+22 = 27
	9th - 	1	 	6		1			21			6+21 = 27
	10th - 	1	 	0		2			20			0+20 = 20
	11th - 	1	 	1		3			19			1+19 = 20
	12th - 	1	 	2		4			18			2+18 = 20
	13th - 	1	 	3		5			17			3+17 = 20
	14th - 	1	 	4		6			16			4+16 = 20
	15th - 	1	 	5		0			15			5+15 = 20
	16th - 	1	 	6		1			14			6+14 = 20
	17th - 	1	 	0		2			13			0+13 = 13
	18th - 	1	 	1		3			12			1+12 = 13
	19th - 	1	 	2		4			11			2+11 = 13
	20th - 	1	 	3		5			10			3+10 = 13
	21st - 	1	 	4		6			9			4+9 = 13
	22nd - 	1	 	5		0			8			5+8 = 13
	23rd - 	1	 	6		1			7			6+7 = 13
	24th - 	1	 	0		2			6			0+6 = 6
	24th - 	1	 	1		3			5			1+5 = 6
	25th - 	1	 	2		4			4			2+4 = 6
	26th - 	1	 	3		5			3			3+3 = 6
	27th - 	1	 	4		6			2			4+2 = 6
	28th - 	1		5 		0			1 			5+1 = 6
	29th - 	1	 	6		1			0			6+0 = 6

for feb 2026
	DATE - DiM%7 	DAY 	DATE%7 	DiM-DATE
	1st - 	0	 	0		1			27			0+27 = 27
	2nd - 	0	 	1		2			26			1+26 = 27
	3rd - 	0	 	2		3			25			2+25 = 27
	4th - 	0	 	3		4			24			3+24 = 27
	5th - 	0	 	4		5			23			4+23 = 27
	6th - 	0	 	5		6			22			5+22 = 27
	7th - 	0	 	6		0			21			6+21 = 27
	9th - 	0	 	0		1			20			0+20 = 20
	10th - 	0	 	1		2			19			1+19 = 20
	11th - 	0	 	2		3			18			2+18 = 20
	12th - 	0	 	3		4			17			3+17 = 20
	13th - 	0	 	4		5			16			4+16 = 20
	14th - 	0	 	5		6			15			5+15 = 20
	15th - 	0	 	6		0			14			6+14 = 20
	16th - 	0	 	0		1			13			0+13 = 13
	17th - 	0	 	1		2			12			1+12 = 13
	18th - 	0	 	2		3			11			2+11 = 13
	19th - 	0	 	3		4			10			3+10 = 13
	20th - 	0	 	4		5			9			4+9 = 13
	21st - 	0	 	5		6			8			5+8 = 13
	22nd - 	0	 	6		0			7			6+7 = 13
	23rd - 	0	 	0		1			6			0+6 = 6
	24th - 	0	 	1		2			5			1+5 = 6
	24th - 	0	 	2		3			4			2+4 = 6
	25th - 	0	 	3		4			3			3+3 = 6
	26th - 	0	 	4		5			2			4+2 = 6
	27th - 	0	 	5		6			1			5+1 = 6
	28th - 	0		6 		0			0 			6+0 = 6
*/

		//SPLITTING ARRAYS
		//Method 1
		/*Object.defineProperty(Array.prototype, 'chunk_inefficient', {
			value: function(chunkSize) {
				var array=this;
					return [].concat.apply([],
						array.map(function(elem,i) {
						return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
					})
				);
			}
		});

		[1,2,3,4,5,6,7].chunk_inefficient(3)
		//[[1,2,3],[4,5,6],[7]]*/

		//Method 2
		/*Object.defineProperty(Array.prototype, 'chunk', {
			value: function(chunkSize) {
				var R = [];
				for (var i=0; i<this.length; i+=chunkSize)
					R.push(this.slice(i,i+chunkSize));
				return R;
			}
		});

		//or 

		var size = 10; var arrayOfArrays = [];
		for (var i=0; i<bigarray.length; i+=size) {
			arrayOfArrays.push(bigarray.slice(i,i+size));
		}
		console.log(arrayOfArrays);*/

		//Method 3
		/*Array.range = function(n) {
			// Array.range(5) --> [0,1,2,3,4]
				return Array.apply(null,Array(n)).map((x,i) => i)
			};

			Object.defineProperty(Array.prototype, 'chunk', {
				value: function(n) {

				// ACTUAL CODE FOR CHUNKING ARRAY:
				return Array.range(Math.ceil(this.length/n)).map((x,i) => this.slice(i*n,i*n+n));
			}
		});

		JSON.stringify( Array.range(10).chunk(3) );
		//[[1,2,3],[4,5,6],[7,8,9],[10]]*/

		//Method 4
		/*var ceil = Math.ceil;

		Object.defineProperty(Array.prototype, 'chunk', {value: function(n) {
			return Array(ceil(this.length/n)).fill().map((_,i) => this.slice(i*n,i*n+n));
		}});*/

		//Method 5
		/*Object.defineProperty(Array.prototype, 'chunk', {value: function(n) {
			return Array.from(Array(ceil(this.length/n)), (_,i)=>this.slice(i*n,i*n+n));
		}});*/
	}

	getWeek(calendarMonth) {
		
		return (
			
			//WEEKS
			//splits and groups the month days into clusters of weeks
			calendarMonth.slice().reduce((accumulator, curr) => {
				const l = accumulator.length;

				if(l === 0  || curr === BaseClass.config.baseDay) {
					accumulator.push([curr]);
				}else {
					accumulator[l-1].push(curr);
				}

				return accumulator;
			}, [])
		);
	}
}


//import GregorianDay from './algorithm/Sakamoto'


class BaseClass {

	constructor(_epoch) {
		this.epoch = {
			year: parseInt(_epoch.getUTCFullYear()),
			month: parseInt(_epoch.getUTCMonth()+1),
			date: parseInt(_epoch.getUTCDate())
		}
		
		this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
	}

	getDayNumber(month = this.epoch.month, date = this.epoch.date, excludeTargetMonth = false) {
		return (
			BaseClass.LOOKUPTABLE.slice(0, month-1).reduce(
				(tally, daysInMonth, i) => tally + this.getDaysInMonth(daysInMonth)
			, excludeTargetMonth ? 0 : date)
		)
	}

	//DEVNOTE: change to work with month values?? and query LOOKUPTABLE directly?
	getDaysInMonth(month) {
		return (Array.isArray(month)) ? month[~~this.isLeapYear()] : month;
	}

	isLeapYear(year = this.epoch.year) {
		return Boolean( (!(year%4) && year%100) || !(year%400) );
	}

	static LOOKUPTABLE = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

BaseClass.config = {
	baseDay: 0
}