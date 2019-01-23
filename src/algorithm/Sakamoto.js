
// Tomohiko Sakamoto Algorithm
// https://groups.google.com/forum/#!msg/comp.lang.c/m4YG7Uw72Ic/WQj-pRNzJaIJ
// [port to JavaScript]

// Returns the day of the week at any given point in time on the Gregorian Calendar(this algorithm should be good for around 3236 years!)
// return will be zero-based with 0=Sunday, 1=Monday, 2=Tuesday...6 = Saturday

// @y - year 
// @m - month [1-12] DEVNOTE: adjust to use javascript convention [0-12]; uncomment the statement below and modify any calls accordingly
// @d - date [1-31]
// NOTE: month and date should be normalized and NOT 0-based.
export default (y, m, d) => {
	// ORIGIN: 01/01/0001 (Jan 1st 1AD) is a Monday in the Gregorian calendar
	// (However if you are working with past dates be mindful that nations and regions were invariably using different calendar systems at some point;
	// for example the move from Julian to Gregorian Calendar required 10 days to be removed(1582, mostly in Europe) and discarded; and it has taken nearly 300 years for widespread adoption)
	// currently(1901-2099), the traditional Julian calendar is 13 days behind the Gregorian calendar.
	// array represents the number of days ahead any given date in a month would be the following year(adjusted to compensate for leap years)
	// - unadjusted this array would contain these values for a straight 365 days every year [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]
	// - eg. ignoring leap years and simplified to 365 for every year. jan is baseline and therefore 0 - we know it contains 31 days. if all things being equal. feb would mimic january day by day and everything would stay constant. this would be true for all months.
	// however all things are not equal(!). There is variance in the number of days every month contains. This introduces an offset to apply with every incremental month since the Jan marker. the offset to apply on days in feb can be reliably represented as 31 = 7x4 + 3days which is equivalent to 31%7.
	// This is the 2nd entry in the array. Each entry represent an offset/ shift of days to be applied in respect of January 1st to calculate a day.
	// 1 is subtracted from every value in the array AFTER january and feb to adjust for leap years as assumption are made later in the calculations(jan and feb will get their years shifted back by 1 year) that require this massaging.
	const offset = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

	// if the month(m) corresponds to January or February we decrement the year(y) by one
	// we do this to level the playing field and avoid the february 28/29 conundrum
	// - we will defer the 365 or 366 days decision for the time being and assume 364 days.
	// we will tack on the crucial missing 1 or 2 days at the next step.
	// if the point in time is after february 28/29 we count from current year, if before we count from previous year.
	// this is equivalent to  y = y - (m < 3) || y = y - (true or false) || y = y - (1 or 0)
	y -= Number(m < 3);

	// a year normally consists of 365 which can be refactored as 364+1; that is (52(weeks)x7(days))+(1 day).
	// therefore it can be reliably assumed the next year will always carry forward 1 day; unless it is a leap in which case days move 2 days forward.
	// modulus 7 because that's how long a week is and we are calculating to the day
	return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + offset[m-1] + d) % 7;
	//return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + offset[m] + d) % 7;
}
