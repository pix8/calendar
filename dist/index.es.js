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

    //super(_epoch);
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

    //super(_epoch);
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
      //DEVNOTE: get rid of this +1
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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

//REF
//https://www.epochconverter.com/weeknumbers
//https://en.wikipedia.org/wiki/ISO_8601
//NOTE: week numbering systems are subject to localisation/regional/cultural conventions
//ISO8601 standard = week start Monday. 1st week of year is week with first Thursday i.e. first 4-day week i.e. week with 4th Jan. a year can have 52 or 53 week numbers.
//import GregorianDay from './algorithm/Sakamoto'

var BaseClass$2 =
/*#__PURE__*/
function () {
  function BaseClass(_epoch) {
    classCallCheck(this, BaseClass);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear()),
      month: parseInt(_epoch.getUTCMonth() + 1),
      //DEVNOTE: get rid of this +1 manipulation
      date: parseInt(_epoch.getUTCDate())
    };
    this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
  } // get year() {
  // 	return this.year;
  // }
  // get month() {
  // 	return this.month;
  // }
  // get date() {
  // 	return this.date;
  // }


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
  }, {
    key: "day",
    get: function get() {
      return GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
    }
  }]);

  return BaseClass;
}();

defineProperty(BaseClass$2, "LOOKUPTABLE", [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

BaseClass$2.config = {
  baseDay: 0
};

var Week =
/*#__PURE__*/
function (_BaseClass) {
  inherits(Week, _BaseClass);

  //class Week extends day {
  function Week(_epoch) {
    var _this2;

    classCallCheck(this, Week);

    //MOCK
    //_epoch = new Date(2018, 0, 30);
    _this2 = possibleConstructorReturn(this, getPrototypeOf(Week).call(this, _epoch));
    var _this2$epoch = _this2.epoch,
        date = _this2$epoch.date,
        month = _this2$epoch.month,
        year = _this2$epoch.year;
    var day = _this2.day;

    var dayNumber = _this2.getDayNumber(month, date);

    var daysInMonth = _this2.getDaysInMonth(BaseClass$2.LOOKUPTABLE[month - 1]); //console.log(`${_epoch.toLocaleString()} is a ${"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",")[day]} Day = ${day} Date = ${date}) Week Number = ${weekNo} Day Number = ${this.getDayNumber(month, date)}`);


    var WEEK = [0, 1, 2, 3, 4, 5, 6]; //DEVNOTE: hardcoding this sequence isn't workable for configurable base day

    console.log("".concat(day, " ").concat((date - 1) % 7, " ").concat(date));

    if (day !== (date - 1) % 7 && day >= date) {
      //console.log(">> partial week segment start");
      //console.log(`${(date%7)}-1=${(date%7)-1} ${day}-${(date%7)-1}=${day-((date%7)-1)}`);
      var foo = WEEK.slice(0, -(WEEK.length - (day - (date % 7 - 1)))),
          bar = WEEK.slice(day - (date % 7 - 1)); //console.log(`week :foobar:  [${foo}][${bar}]`);

      return possibleConstructorReturn(_this2, [foo, bar]);
    } else if (day + (daysInMonth - date) < 6) {
      //console.log(">> partial week segment end");
      var foo = WEEK.slice(0, day + (daysInMonth - date) + 1),
          bar = WEEK.slice(day + (daysInMonth - date) + 1); //console.log(`week :foobar:  [${foo}][${bar}]`);

      return possibleConstructorReturn(_this2, [foo, bar]);
    } //console.log(">> do nothing")


    return possibleConstructorReturn(_this2, WEEK); //week number
    //week number indication and way to give epoch context
    //Week construct would have to abide by the config.baseday for construction
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
}(BaseClass$2);

// 	this.epoch = {
// 		year: parseInt(_epoch.getUTCFullYear()),
// 		month: parseInt(_epoch.getUTCMonth()+1),
// 		date: parseInt(_epoch.getUTCDate())
// 	};
// 	var dateDay = _epoch.getUTCDay();
// 	var calendarDay = GregorianDay(this.epoch.year, this.epoch.month, this.epoch.date);
// 	return [calendarDay];
// }

var Day =
/*#__PURE__*/
function () {
  function Day(_epoch) {
    classCallCheck(this, Day);

    this.epoch = {
      year: parseInt(_epoch.getUTCFullYear()),
      month: parseInt(_epoch.getUTCMonth() + 1),
      date: parseInt(_epoch.getUTCDate())
    };
    this.calendarYearOffset = GregorianDay(this.epoch.year, 1, 1);
  } // get year() {
  // 	return this.year;
  // }
  // get month() {
  // 	return this.month;
  // }
  // get date() {
  // 	return this.date;
  // }


  createClass(Day, [{
    key: "getDayNumber",
    value: function getDayNumber() {
      var _this = this;

      var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.month;
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.epoch.date;
      var excludeTargetMonth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return Day.LOOKUPTABLE.slice(0, month - 1).reduce(function (tally, daysInMonth, i) {
        return tally + _this.getDaysInMonth(daysInMonth);
      }, excludeTargetMonth ? 0 : date);
    } //DEVNOTE: change to work with month values?? and query LOOKUPTABLE directly?

  }, {
    key: "getDaysInMonth",
    value: function getDaysInMonth(month) {
      return Array.isArray(month) ? month[~~this.isLeapYear()] : month;
    } //static isLeapYear(year = this.epoch.year) {

  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.epoch.year;
      return Boolean(!(year % 4) && year % 100 || !(year % 400));
    }
  }, {
    key: "day",
    get: function get() {
      return GregorianDay(this.epoch.year, this.epoch.month, this.epoch.year);
    }
  }]);

  return Day;
}();

defineProperty(Day, "LOOKUPTABLE", [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
Day.config = {
  baseDay: 0,
  weekStartDay: 0,
  weekNumberStartDay: 4
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

export default Pix8Calendar;
