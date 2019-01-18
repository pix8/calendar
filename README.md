# @pix8/calendar

[![npm (scoped)](https://img.shields.io/npm/v/@pix8/calendar.svg)](https://www.npmjs.com/package/@pix8/calendar)
[![CircleCI](https://circleci.com/bb/pix8/npm.calendar.svg?style=svg&circle-token=6a94ff0d0a7d7557a3d3438d87501d980e932ce2)](https://circleci.com/bb/pix8/npm.calendar)

Here be dragons: This module is flagged as **beta** i.e. functional but still being formed + subject to indiscriminate change. Unless you are curious about the code behind you should wait for a **rc**.

## Overview

A simple date factory for outputting a [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) date range given a target date.

Vanilla dependency-free javascript consumed as a service for the creation of UI interfaces that are hydrated by a date model. This module will never be more than a fountain.

The prime difference between this library and other implementations is that this gets down and dirty and actually does the maths to calculates the date ranges rather than expediting proceedings with recursive conditional loops and increments(although they are written + documented far nicer than my shambolic attempts). In my mind these methods expose a lot of redundancy and expensive operations for what should be a trivial bean counting exercise. So in theory this should make it superfast - although unproven - but I should really run some comparison tests at some point.

Incidentally this is based on Sakamoto's methods which is an adaptation of the Zeller’s algorithm.

### Gregorian calendar rules
It took a while and a fair few attempts but the concept of 'time' is one of the earliest examples of global standardisation and successful assimilation. As is now commonly known the concept of time and date is based on the movement of the Earth around the Sun(solar calendar), however this period isn't a nice round number and there are fluctuations that need to be reconciled. The Gregorian calendar is the basis for our modern day calendar adopted worldwide that best fits this pattern. However it is not perfect hence it requires periodic re-alignment based on a mathemathetical formula that keeps it more or less in synch with the planet(and the seasons).

Nevertheless the algorithm can be distilled into a simple set of rules.

* A day(leap day) is added to years exactly divisible by four(a leap year) +unless+ the year is also divisible by 100.
* However if a centurial year is divisible by 400 an additional day(leap day) is added regardless.

Note: Implementation is time agnostic to avoid the perils of timezone localisation, turbulent international date lines and leap seconds etc...

## Getting Started

Terminal
```sh
$ npm install @pix8/calendar
# use either --save or --save-dev flag depending on your needs
```

Import module into your script as desired and consume.
```javascript
import Calendar from '@pix8/calendar'
var calendar = new Calendar();
```

## Usage

Takes a single argument that corresponds to any valid value for a JavaScript Date Object, a Date instance itself or if no argument is supplied, the current date will be used and extracted from the local system.

All calls are handled as promises and return ~~a JSON~~ an Array representation of the date query. All data returned is raw/native format. So days of the week and months are represented in the standard JavaScript conventions for consumption(i.e. zero-based where applicable). It is down to you to massage or convert these down further. Some static helper props are sent down the wire to assist but bear in mind thoughts such as localisations + I will more than likely remove/separate this feature because of that overhead and peeps can simply leverage this similarly as an imported ES6 module to suit their individual use case.

Meaning is inferred by composition and granted by the array nesting structure with each level representing a date span, top tier = year, 2nd tier = month, 3rd tier = week and the values of course are the day values. So for instance the year of a particular data set would be inferred by it's positional index. Similarly this logic would be applied to months and to weeks until we reach the bottom of the granular chain where the day value is ultimately stored(a date would also be ascertained from index position). Effectively everything is in logical order and the arrays can simply be unravelled/flattened at a desired depth to stimulate whatever meaning suits your purpose. For example to extract date values for a month you flatten the array(at this level) to remove the extraneous arrays wrapping collections of weeks. You could also use the length of a starting or trailing week array to establish and calculate days needed to pad out a month in a user interface without contaminating the source of truth(our data model) with superfluous/duplicated representations that exist purely to service the interface.

The ultimate rationality is to keep the functionality of this module pure, unopinionated and agnostic to it's treatment.

### API

#### getCalendarYear(date)

```javascript
var date = new Date();

calendar.getCalendarYear(date).then(data => {
	//handle returned data
});
```

Output: 2019-01-01 (ISO)
```javascript
[
	[ //year
		[ //month
			[ //week
				2,3,4,5,6
			],
			[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4]
		],
		[
			[5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4]]
		,
		[
			[5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0]
		],
		[
			[1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2]]
		,
		[
			[3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5]
		],
		[
			[6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0]
		],
		[
			[1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3]
		],
		[
			[4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]
		],
		[
			[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1]
		],
		[
			[2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4]
		],
		[
			[5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]
		],
		[
			[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2]
		]
	]
]
```

#### getYear(date)
Returns ~~a JSON~~ an Array representation of the calendar year for a given date. Values held in array notation and abide to standard JavaScript conventions(0-6 = Sunday-Saturday; 0-11 = January-December).

```javascript
var date = new Date();

calendar.getYear(date).then(data => {
	//handle returned data
});
```

Output: 2019-01-01 (ISO)
```javascript

[ //year
	[ //month
		[ //week
			2,3,4,5,6
		],
		[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4]
	],
	[
		[5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4]]
	,
	[
		[5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0]
	],
	[
		[1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2]]
	,
	[
		[3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5]
	],
	[
		[6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0]
	],
	[
		[1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3]
	],
	[
		[4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]
	],
	[
		[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1]
	],
	[
		[2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4]
	],
	[
		[5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]
	],
	[
		[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2]
	]
]

```

##### getCalendarMonth(date)

```javascript
var date = new Date();

calendar.getCalendarMonth(date).then(data => {
	//handle returned data
});

```

Output: 2019-01-01 (ISO)
```javascript
[
	[ //year
		[ //month
			[ //week
				2,3,4,5,6
			],
			[0,1,2,3,4,5,6],
			[0,1,2,3,4,5,6],
			[0,1,2,3,4,5,6],
			[0,1,2,3,4]
		]
	]
]
```

##### getMonth(date)
Returns ~~a JSON~~ an Array representation of the calendar month for a given date. Values held in array notation and comply with JavaScript conventions(0-6 = Sunday-Saturday; 0-11 = January-December).

```javascript
var date = new Date();

calendar.getMonth(date).then(data => {
	//handle returned data
});

```

Output: 2019-01-01 (ISO)
```javascript

[ //month
	[ //week
		2,3,4,5,6
	],
	[0,1,2,3,4,5,6],
	[0,1,2,3,4,5,6],
	[0,1,2,3,4,5,6],
	[0,1,2,3,4]
]
```

## Possible Enhancements

* ~~Ability to lookahead and pre-fetch neighbouring weeks, months or years so there is minimal lag in the user experience~~ *thinking about it this would be an implementation specific feature and would be outside scope. So has been scrubbed. Likely work this feature into a couple of complementary calendar UI modules(react & vue versions) that are in the works instead.*
* Introduce argument to specify a week's start day - currently preset to 0(Sunday) but will allow flexibility for base to be any day.
* Current treatment is ignorrant of time units which are distorted by local geographic conventions(which are non-standard, inconsistent and unreliable) - compensating for daylight saving poses a particular challenge and remains an unopened can of worms.
* Public/bank holiday extension module
* Localisation extension module

### Future Objectives

* Host online as live API service -> CJS version on a simple open Express server
