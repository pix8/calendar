
// Tomohiko Sakamoto Algorithm
// https://groups.google.com/forum/#!msg/comp.lang.c/m4YG7Uw72Ic/WQj-pRNzJaIJ
// [port to JavaScript]

// ORIGIN: 01/01/0001 (Jan 1st 1AD) is a Monday in the Gregorian calendar
// Returns the day of the week at any given point in time on the Gregorian Calendar(this algorithm should be good for around 3236 years!)
// return will be zero-based with 0=Sunday, 1=Monday, 2=Tuesday...6 = Saturday

// @y - year 
// @m - month [1-12] DEVNOTE: adjust to use javascript convention [0-12]; uncomment the statement below and modify any calls accordingly
// @d - date [1-31]
export default (y, m, d) => {
	const offset = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

	y -= Number(m < 2);

	return (y + ~~(y/4) - ~~(y/100) + ~~(y/400) + offset[m] + d) % 7;
}
