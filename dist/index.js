'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

// Tomohiko Sakamoto Algorithm
// https://groups.google.com/forum/#!msg/comp.lang.c/m4YG7Uw72Ic/WQj-pRNzJaIJ
// [port to JavaScript]
// Returns the day of the week at any given point in time on the Gregorian Calendar(this algorithm should be good for around 3236 years!)
// return will be zero-based with 0=Sunday, 1=Monday, 2=Tuesday...6 = Saturday
// @y - year 
// @m - month [1-12]
// @d - date [1-31]
// NOTE: month and date should be normalized and NOT 0-based.
var GregorianDay = (function (y, m, d) {
  // ORIGIN: 01/01/0001 (Jan 1st 1AD) is a Monday in the Gregorian calendar
  // (However if you are working with past dates be mindful that nations and regions were invariably using different calendar systems at some point;
  // for example the move from Julian to Gregorian Calendar required 10 days to be removed(1582, mostly in Europe) and discarded; and it has taken nearly 300 years for widespread adoption)
  // currently(1901-2099), the traditional Julian calendar is 13 days behind the Gregorian calendar.
  // array represents the number of days ahead any given date in a month would be the following year(adjusted to compensate for leap years)
  // - unadjusted this array would contain these values for a straight 365 days every year [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]
  var offset = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]; // if the month(m) corresponds to January or February we decrement the year(y) by one
  // we do this to level the playing field and avoid the february 28/29 conundrum
  // - we will defer the 365 or 366 days decision for the time being and assume 364 days.
  // we will tack on the crucial missing 1 or 2 days at the next step.
  // if the point in time is after february 28/29 we count from current year, if before we count from previous year.
  // this is equivalent to  y = y - (m < 3) || y = y - (true or false) || y = y - (1 or 0)

  y -= Number(m < 3); // a year normally consists of 365 which can be refactored as 364+1; that is (52(weeks)x7(days))+(1 day).
  // therefore it can be reliably assumed the next year will always be carried forward 1 day; unless it is a leap in which case days move 2 days forward.
  // modulus 7 because that's how long a week is and we are calculating to the day

  return (y + ~~(y / 4) - ~~(y / 100) + ~~(y / 400) + offset[m - 1] + d) % 7;
}); // export default (y, m, d) => {
// 	y -=m < 3;
// 	return(y + y/4 -y/100 +y/400 + [m] + d) % 7;
// }

//import Week from './Week'
var Month =
/*#__PURE__*/
function () {
  //export default class Month extends Week { //--> extends Day //--> extends BaseClass
  function Month(_epoch) {
    classCallCheck(this, Month);

    this.baseClass = new BaseClass(_epoch);
    var dayNumber = this.baseClass.getDayNumber(this.baseClass.epoch.month, null, true),
        daysInMonth = BaseClass.LOOKUPTABLE[this.baseClass.epoch.month - 1]; //--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)

    daysInMonth = this.baseClass.getDaysInMonth(daysInMonth); //1.

    var calendarMonth = this.getMonth(daysInMonth, dayNumber);
    return this.getWeek(calendarMonth);
  }

  createClass(Month, [{
    key: "getMonth",
    value: function getMonth(daysInMonth, dayNumber) {
      var _this = this;

      //MONTHS
      return toConsumableArray(Array(daysInMonth)).map(function (item, j) {
        return (j + dayNumber + _this.baseClass.calendarYearOffset) % 7;
      });
    } //Scheduled for demolition -----------------> 1. Week Class

  }, {
    key: "getWeek",
    value: function getWeek(calendarMonth) {
      return (//WEEKS
        //splits and groups the month days into clusters of weeks
        calendarMonth.slice().reduce(function (accumulator, curr) {
          var l = accumulator.length;

          if (l === 0 || curr === BaseClass.config.baseDay) {
            accumulator.push([curr]);
          } else {
            accumulator[l - 1].push(curr);
          }

          return accumulator;
        }, [])
      );
    } //Scheduled for demolition -----------------> 1. Week Class

  }]);

  return Month;
}();

var BaseClass =
/*#__PURE__*/
function () {
  function BaseClass(_epoch) {
    classCallCheck(this, BaseClass);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear()),
      month: parseInt(_epoch.getUTCMonth() + 1),
      date: parseInt(_epoch.getUTCDate())
    };
    this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
  }

  createClass(BaseClass, [{
    key: "getDayNumber",
    value: function getDayNumber() {
      var _this2 = this;

      var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.month;
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.epoch.date;
      var excludeTargetMonth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return BaseClass.LOOKUPTABLE.slice(0, month - 1).reduce(function (tally, daysInMonth, i) {
        return tally + _this2.getDaysInMonth(daysInMonth);
      }, excludeTargetMonth ? 0 : date);
    }
  }, {
    key: "getDaysInMonth",
    value: function getDaysInMonth(month) {
      return Array.isArray(month) ? month[~~this.isLeapYear()] : month;
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.year;
      return Boolean(!(year % 4) && year % 100 || !(year % 400));
    }
  }]);

  return BaseClass;
}();

defineProperty(BaseClass, "LOOKUPTABLE", [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

BaseClass.config = {
  baseDay: 0
};

var Year =
/*#__PURE__*/
function () {
  //export default class Year extends Month {
  function Year(_epoch) {
    var _this = this;

    classCallCheck(this, Year);

    this.baseClass = new BaseClass$1(_epoch); //YEAR

    return BaseClass$1.LOOKUPTABLE.slice().reduce(function (accumulator, daysInMonth, i) {
      //--- MONTH Constructor Requirement = (Year day tally) & (No. of days in month)
      daysInMonth = _this.baseClass.getDaysInMonth(daysInMonth); //1.

      var calendarMonth = _this.getMonth(daysInMonth, accumulator.flat(2).length); //2.


      accumulator[i] = _this.getWeek(calendarMonth); //console.log(new Date(2019, i, 1).toLocaleString(), " :: " ,new Month(new Date(2019, i, 1)));
      //accumulator[i] = new Month( new Date(2019, i, 1) );

      return accumulator;
    }, []);
  } //Scheduled for demolition -----------------> 1. Month Class


  createClass(Year, [{
    key: "getMonth",
    value: function getMonth(daysInMonth, dayNumber) {
      var _this2 = this;

      //MONTHS
      return toConsumableArray(Array(daysInMonth)).map(function (item, j) {
        return (j + dayNumber + _this2.baseClass.calendarYearOffset) % 7;
      });
    } //Scheduled for demolition -----------------> 1. Month Class
    //Scheduled for demolition -----------------> 2. Week Class

  }, {
    key: "getWeek",
    value: function getWeek(calendarMonth) {
      return (//WEEKS
        //splits and groups the month days into clusters of weeks
        calendarMonth.slice().reduce(function (accumulator, curr) {
          var l = accumulator.length;

          if (l === 0 || curr === BaseClass$1.config.baseDay) {
            accumulator.push([curr]);
          } else {
            accumulator[l - 1].push(curr);
          }

          return accumulator;
        }, [])
      );
    } //Scheduled for demolition -----------------> 2. Week Class

  }]);

  return Year;
}();

var BaseClass$1 =
/*#__PURE__*/
function () {
  function BaseClass(_epoch) {
    classCallCheck(this, BaseClass);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear()),
      month: parseInt(_epoch.getUTCMonth() + 1),
      date: parseInt(_epoch.getUTCDate())
    };
    this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
  }

  createClass(BaseClass, [{
    key: "getDayNumber",
    value: function getDayNumber() {
      var _this3 = this;

      var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.month;
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.epoch.date;
      var excludeTargetMonth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return BaseClass.LOOKUPTABLE.slice(0, month - 1).reduce(function (tally, daysInMonth, i) {
        return tally + _this3.getDaysInMonth(daysInMonth);
      }, excludeTargetMonth ? 0 : date);
    }
  }, {
    key: "getDaysInMonth",
    value: function getDaysInMonth(month) {
      return Array.isArray(month) ? month[~~this.isLeapYear()] : month;
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.year;
      return Boolean(!(year % 4) && year % 100 || !(year % 400));
    }
  }]);

  return BaseClass;
}();

defineProperty(BaseClass$1, "LOOKUPTABLE", [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

BaseClass$1.config = {
  baseDay: 0
};

// export default function Week(_epoch) {
// 	return [0, 1, 2, 3, 4, 5, 6];
// }
//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.

var Week =
/*#__PURE__*/
function () {
  //class Week extends day {
  function Week(_epoch) {
    classCallCheck(this, Week);

    //MOCK
    var date = 1;
    var month = 1;
    var year = 2018;
    _epoch = new Date(year, month - 1, date);
    this.baseClass = new BaseClass$2(_epoch);
    var dayNumber = this.baseClass.getDayNumber(month, date);
    var weekNo = Math.ceil(dayNumber / 7); //DEVNOTE: temp and crude; assumes 1st Jan = 0(Sunday). Not taking into account year offset.
    //if partial construct dual arrays(+week number and epoch context)

    var day = GregorianDay(year, month, date);
    var daysInMonth = this.baseClass.getDaysInMonth(BaseClass$2.LOOKUPTABLE[month - 1]);
    var week = [];
    console.log("".concat(new Date(year, month - 1, date).toLocaleString(), " is a ").concat("Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[day], " day = ").concat(day, " date = ").concat(date, ")"));
    console.log("Week number = ".concat(weekNo, " Day number = ").concat(this.baseClass.getDayNumber(month, date))); // console.log(day, " :: ", date, "=", (day > date));
    // console.log(day, " :: ", date-1, " :: ", (date-1)%7, "=", (day !== (date-1)%7));
    // console.log(`days in month :DiM: ${daysInMonth} :mod: ${daysInMonth%7} :day: ${day} :date: ${date}`);
    // console.log( `${day} :: ${daysInMonth} - ${date} = ${daysInMonth-date}`,  (day+(daysInMonth-date) < 6) )

    var WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day

    if (day !== (date - 1) % 7 && day > date) {
      console.log(">> incomplete week segment start");
      var foo = WEEK.slice(day);
      var bar = WEEK.slice(0, -(WEEK.length - day)); // console.log("week :foo: ", foo);
      // console.log("week :bar: ", bar);
      // console.log("week :splice: ", WEEK.slice().splice(0, day) );

      return [bar, foo];
    } else if (day + (daysInMonth - date) < 6) {
      console.log(">> incomplete week segment end");
      var foo = WEEK.slice(day);
      var bar = WEEK.slice(0, -(WEEK.length - day));
      return [foo, bar];
    }

    console.log(">> do nothing");
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

    for (var i = day, l = week.length; i < 7; ++i) {
      week.push(i);
    }
    console.log(week); //return week
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

  createClass(Week, [{
    key: "getWeek",
    value: function getWeek(calendarMonth) {
      return (//WEEKS
        //splits and groups the month days into clusters of weeks
        calendarMonth.slice().reduce(function (accumulator, curr) {
          var l = accumulator.length;

          if (l === 0 || curr === BaseClass$2.config.baseDay) {
            accumulator.push([curr]);
          } else {
            accumulator[l - 1].push(curr);
          }

          return accumulator;
        }, [])
      );
    }
  }]);

  return Week;
}(); //import GregorianDay from './algorithm/Sakamoto'

var BaseClass$2 =
/*#__PURE__*/
function () {
  function BaseClass(_epoch) {
    classCallCheck(this, BaseClass);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear()),
      month: parseInt(_epoch.getUTCMonth() + 1),
      date: parseInt(_epoch.getUTCDate())
    };
    this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
  }

  createClass(BaseClass, [{
    key: "getDayNumber",
    value: function getDayNumber() {
      var _this = this;

      var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.month;
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.epoch.date;
      var excludeTargetMonth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return BaseClass.LOOKUPTABLE.slice(0, month - 1).reduce(function (tally, daysInMonth, i) {
        return tally + _this.getDaysInMonth(daysInMonth);
      }, excludeTargetMonth ? 0 : date);
    } //DEVNOTE: change to work with month values?? and query LOOKUPTABLE directly?

  }, {
    key: "getDaysInMonth",
    value: function getDaysInMonth(month) {
      return Array.isArray(month) ? month[~~this.isLeapYear()] : month;
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.year;
      return Boolean(!(year % 4) && year % 100 || !(year % 400));
    }
  }]);

  return BaseClass;
}();

defineProperty(BaseClass$2, "LOOKUPTABLE", [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

BaseClass$2.config = {
  baseDay: 0
};

var en = {
  //MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
  DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

var Pix8Calendar =
/*#__PURE__*/
function () {
  function Pix8Calendar() {

    classCallCheck(this, Pix8Calendar);

    console.log("|| Pix8.Calendar service instantiated ||");
    this.locales = en;
    this.calendar = new Array(); //Object.freeze(), Object.seal()
  }

  createClass(Pix8Calendar, [{
    key: "isValidDate",

    /**
    * Validates a date object
    * @param {Date} date - an object instantiated with the new Date constructor
    * @return {Boolean}
    */
    value: function isValidDate(date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return false;
      }

      return !isNaN(date.getTime());
    }
  }, {
    key: "setLocale",
    value: function setLocale(customLocale) {}
  }, {
    key: "getCalendarYear",
    value: function getCalendarYear() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var epoch = new Date(_epoch);
      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date");
      var year = parseInt(epoch.getUTCFullYear());
      if (!this.calendar[year]) this.calendar[year] = new Year(epoch);
      return Promise.resolve(this.calendar);
      /*Pix8Calendar.collection[epoch.getUTCFullYear()] = new Year(epoch);
      	//returns Array with a Calendar representation(relative to the epoch) supplied as years, months, weeks and dates
      return Promise.resolve(Pix8Calendar.collection);*/
    }
  }, {
    key: "getCalendarMonth",
    value: function getCalendarMonth() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var epoch = new Date(_epoch);
      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date");
      var year = parseInt(epoch.getUTCFullYear()),
          month = parseInt(epoch.getUTCMonth()); //TEMP

      var calendar = new Array();
      calendar[year] = new Array(12);
      calendar[year][month] = new Month(epoch); //epoch.toLocaleString();

      return Promise.resolve(calendar);
    }
  }, {
    key: "getYear",

    /*getCalendarWeek(_epoch = new Date()) {
    	var epoch = new Date(_epoch);
    		if(!this.isValidDate(epoch))
    		throw TypeError("Pix8Calendar: Query is not a valid date");
    		var year = parseInt(epoch.getUTCFullYear()),
    		month = parseInt(epoch.getUTCMonth()),
    		date = parseInt(epoch.getUTCDate());
    		//TEMP
    	var calendar = new Array();
    		calendar[year] = new Array(12);
    	calendar[year][month] = new Array(new Month(epoch).length)
    	var week = 0;
    	calendar[year][month][week] = "TBC";//which week is the date?
    	//DEVNOTE: week will need to be split into respective month/year position and 2nd array if partial
    	// ie, [...null,null,[null,null,null,null,[0,1]]],[[[2,3,4,5,6],null,null,null,null], null, null...]
    		return Promise.resolve(calendar);
    };*/

    /*getCalendarDay(_epoch = new Date()) {
    	var epoch = new Date(_epoch);
    		if(!this.isValidDate(epoch))
    		throw TypeError("Pix8Calendar: Query is not a valid date");
    		var year = parseInt(epoch.getUTCFullYear()),
    		month = parseInt(epoch.getUTCMonth()),
    		date = parseInt(epoch.getUTCDate());
    		//TEMP
    	var calendar = new Array();
    		calendar[year] = new Array(12);
    	calendar[year][month] = new Array(new Month(epoch).length)
    	var week = 0;
    	calendar[year][month][week] = "TBC";//which week is the date?
    		return Promise.resolve(calendar);
    };*/
    value: function getYear() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var epoch = new Date(_epoch);
      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date"); //returns Array with a Year's worth of dates(relative to the epoch) supplied as months, weeks and dates

      return Promise.resolve(new Year(epoch));
    }
  }, {
    key: "getMonth",
    value: function getMonth() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var epoch = new Date(_epoch);
      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date"); //returns Array with a Month's worth of dates(relative to the epoch) supplied as weeks and dates

      return Promise.resolve(new Month(epoch));
    }
  }, {
    key: "getWeek",
    value: function getWeek() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var epoch = new Date(_epoch);
      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date");
      return Promise.resolve(new Week(epoch));
    }
  }]);

  return Pix8Calendar;
}();

module.exports = Pix8Calendar;
