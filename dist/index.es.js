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

/* Array.isArray
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*************************/
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

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

function Day(_epoch) {
  this.epoch = {
    year: parseInt(_epoch.getUTCFullYear(), 10),
    month: parseInt(_epoch.getUTCMonth() + 1, 10),
    date: parseInt(_epoch.getUTCDate(), 10)
  };

  var dateDay = _epoch.getUTCDay();

  var calendarDay = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
  return [calendarDay];
}

function Week(_epoch) {
  this.epoch = {
    year: parseInt(_epoch.getUTCFullYear(), 10),
    month: parseInt(_epoch.getUTCMonth() + 1, 10),
    date: parseInt(_epoch.getUTCDate(), 10)
  };
  var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
  var calendarWeek = [0, 1, 2, 3, 4, 5, 6];
  return calendarWeek; //return (yearDayCount + calendarOffset)%7;
}

var Month =
/*#__PURE__*/
function () {
  function Month(_epoch) {
    var _this = this;

    classCallCheck(this, Month);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear(), 10),
      month: parseInt(_epoch.getUTCMonth() + 1, 10),
      date: parseInt(_epoch.getUTCDate(), 10)
    };
    var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
    var yearDayTally = Month.STATICS.LOOKUPTABLE.slice(0, this.epoch.month - 1).reduce(function (tally, curr, i) {
      return tally + (Array.isArray(curr) ? curr[~~_this.isLeapYear(_this.epoch.year)] : curr);
    }, 0);
    var daysInMonth = Month.STATICS.LOOKUPTABLE[this.epoch.month - 1];
    if (Array.isArray(daysInMonth)) daysInMonth = daysInMonth[~~this.isLeapYear(this.epoch.year)];
    return toConsumableArray(Array(daysInMonth)).map(function (item, j) {
      return (j + yearDayTally + calendarYearOffset) % 7;
    });
  }

  createClass(Month, [{
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return Boolean(!(year % 4) && year % 100 || !(year % 400));
    }
  }]);

  return Month;
}();
Month.STATICS = {
  LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
};

var Year =
/*#__PURE__*/
function () {
  function Year(_epoch) {
    var _this = this;

    classCallCheck(this, Year);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear(), 10),
      month: parseInt(_epoch.getUTCMonth() + 1, 10),
      date: parseInt(_epoch.getUTCDate(), 10)
    };
    var calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
    var calendarYear = [];
    Year.STATICS.LOOKUPTABLE.slice().reduce(function (tally, curr, i) {
      if (Array.isArray(curr)) curr = curr[~~_this.isLeapYear(_this.epoch.year)];

      var calendarMonth = toConsumableArray(Array(curr)).map(function (item, j) {
        return (j + tally + calendarYearOffset) % 7;
      });

      calendarYear[i] = calendarMonth;
      return tally + curr;
    }, 0);
    return calendarYear;
  }

  createClass(Year, [{
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return Boolean(!(year % 4) && year % 100 || !(year % 400));
    }
  }]);

  return Year;
}();
Year.STATICS = {
  LOOKUPTABLE: [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
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
    var epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().toISOString();

    classCallCheck(this, Pix8Calendar);

    console.log("|| Pix8.Calendar service instantiated ||");
    this.locales = en;
    console.log(this.locales);
  }
  /**
  * Validates a date object
  * @param {Date} date - an object instantiated with the new Date constructor
  * @return {Boolean}
  */


  createClass(Pix8Calendar, [{
    key: "isValidDate",
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
    key: "getYear",
    value: function getYear() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().toISOString();

      var epoch = new Date(_epoch); //TODO: validate: check for invalid arg(date) and output empty JSON object in response

      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date"); //returns JSON with a Year's worth of dates(relative to the epoch) supplied as months, weeks and dates

      return Promise.resolve(new Year(epoch)); // return new Promise(
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
    }
  }, {
    key: "getMonth",
    value: function getMonth() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().toISOString();

      var epoch = new Date(_epoch); //TODO: validate: check for invalid arg(date) and output empty JSON object in response

      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date"); //returns JSON with a Month's worth of dates(relative to the epoch) supplied as weeks and dates

      return Promise.resolve(new Month(epoch)); // return new Promise( (resolve) => {
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
    }
  }, {
    key: "getWeek",
    value: function getWeek() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().toISOString();

      var epoch = new Date(_epoch); //TODO: validate: check for invalid arg(date) and output empty JSON object in response

      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date");
      return Promise.resolve(new Week(epoch));
    }
  }, {
    key: "getDay",
    value: function getDay() {
      var _epoch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().toISOString();

      var epoch = new Date(_epoch); //TODO: validate: check for invalid arg(date) and output empty JSON object in response

      if (!this.isValidDate(epoch)) throw TypeError("Pix8Calendar: Query is not a valid date");
      return Promise.resolve(new Day(epoch));
    }
  }]);

  return Pix8Calendar;
}(); //export default new Pix8Calendar();

export default Pix8Calendar;
