# @pix8/calendar

WIP

## Overview

A simple date factory for outputting a [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) date range.

Vanilla javascript consumed as a service. Dependency on Moment.js for obvious reasons and underscore. These are both convenience libraries so half-tempted to wean them out.

### Gregorian calendar rules
It took a while and a fair few attempts but the concept of 'time' is one of the earliest examples of global standardisation and successful assimilation. As is now commonly known the concept of time and date is based on the movement of the Earth around the Sun(solar calendar), however this period isn't a nice round number and there are fluctuations that need to be reconciled. The Gregorian calendar is the basis for our modern day calendar adopted worldwide that best fits this pattern. However it is not perfect hence it requires periodic re-alignment based on a mathemathetical formula that keeps it more or less in synch with the planet(and the seasons).

* A day(leap day) is added to years exactly divisible by four(a leap year) +unless+ the year is also divisible by 100.
* However if a centurial year is divisible by 400 an additional day(leap day) is added regardless.

## Getting Started

## Usage

Data is returned as a promise. All data returned is raw/native format. So days of the week, months are represented in the standard JavaScript conventions for consumption. It is down to you to massage or convert these down further. Some static helper props are sent down the wire to assist but bear in mind such thoughts such as localisations.

## Possible Enhancements

* Remove moment.js dependency
* Current treatment is ignorrant of time units which are distorted by local geographic conventions(which are non-standard, inconsistent and unreliable) - compensating for daylight saving poses a particular challenge and remains an unopened can of worms.
* Public/bank holiday extension module
* Localisation extension module