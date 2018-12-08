# @pix8/calendar

[![npm (scoped)](https://img.shields.io/npm/v/@pix8/calendar.svg)](https://www.npmjs.com/package/@pix8/calendar)
[![CircleCI](https://circleci.com/bb/pix8/npm.calendar.svg?style=svg&circle-token=6a94ff0d0a7d7557a3d3438d87501d980e932ce2)](https://circleci.com/bb/pix8/npm.calendar)

## Overview

A simple date factory for outputting a [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) date range given a target date.

Vanilla javascript consumed as a service. Dependency on Moment.js for obvious reasons but half-tempted to wean it out unless the convenience + added value proves strictly necessary.

The prime difference between this library and other implementations is that this gets down and dirty and actually does the maths to calculates the date ranges rather than expediting proceedings with recursive conditional loops and increments(although they are written + documented far nicer than my shambolic attempts). In my mind these methods expose a lot of redundancy and expensive operations for what should be a trivial bean counting exercise. So in theory(at least in my head) this should make it superfast - although unproven - but I should really run some comparison tests at some point.

Incidentally this is based on Sakamoto's methods which is an adaptation of the Zeller’s algorithm.

### Gregorian calendar rules
It took a while and a fair few attempts but the concept of 'time' is one of the earliest examples of global standardisation and successful assimilation. As is now commonly known the concept of time and date is based on the movement of the Earth around the Sun(solar calendar), however this period isn't a nice round number and there are fluctuations that need to be reconciled. The Gregorian calendar is the basis for our modern day calendar adopted worldwide that best fits this pattern. However it is not perfect hence it requires periodic re-alignment based on a mathemathetical formula that keeps it more or less in synch with the planet(and the seasons).

* A day(leap day) is added to years exactly divisible by four(a leap year) +unless+ the year is also divisible by 100.
* However if a centurial year is divisible by 400 an additional day(leap day) is added regardless.

## Getting Started

Terminal window 1
```sh
$ npm install @pix8/calendar
# use either --save or --save-dev flag depending on your needs
```

Import module into your script as desired and consume.
```javascript
import Calendar from '@pix8/calendar'
```

## Usage

All calls are handled as promises and return a JSON representation of the date query. All data returned is raw/native format. So days of the week and months are represented in the standard JavaScript conventions for consumption(i.e. zero-based where applicable). It is down to you to massage or convert these down further. Some static helper props are sent down the wire to assist but bear in mind thoughts such as localisations + I will more than likely remove/separate this feature because of that overhead and peeps can simply leverage this similarly as an imported ES6 module to suit their individual use case.

```javascript
getYear(date)

```

```javascript
getMonth(date)

```

```javascript
getWeek(date)

```

## Return

## Possible Enhancements

* Remove moment.js dependency
* Current treatment is ignorrant of time units which are distorted by local geographic conventions(which are non-standard, inconsistent and unreliable) - compensating for daylight saving poses a particular challenge and remains an unopened can of worms.
* Public/bank holiday extension module
* Localisation extension module