// Rata Die(IBM) method
// Returns the day of the week at any given point in time on the Gregorian Calendar

export default (y, m, d) => {
	
	var lookupTable = [
		[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		[0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	];

	//cumalutive tally; total number of days since Monday 1st Jan 1AD
	var totalDays = d;
	
	// start counting years since /origin'
	// 01/01/0001 (Jan 1st 1AD). this is a Monday in the Gregorian calendar
	for(var year = 1; year <= y; year++) {
		
		var max_month = ( year < y ? 12 : m-1 );
		
		// test for leap year
		//var isLeapYear = (year%4 == 0);
		//if(year%100 == 0 && year%400 != 0) leap = 0;

		//var isLeapYear = (year%4 == 0 && year%100 != 0) || (year%400 == 0);
		var isLeapYear = (!(year%4) && year%100) || !(year%400);
		
		// start counting days in the year
		for(var month = 1; month <= max_month; month++) {

			// alternate days in a month lookup table depending on leap year test
			totalDays += lookupTable[isLeapYear][month];
		}
	}

	return totalDays;
}