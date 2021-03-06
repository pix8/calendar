import Pix8Calendar from './Calendar'


var calendar = new Pix8Calendar();

//SPECS
// TEST DATE = 1st December 2018
var epoch = new Date(2018, 11, 1);

// Return exists
test('data exists', () => {
	expect.assertions(1);
	return calendar.getYear(epoch).then(
		(data) => expect(data).toBeDefined()
	);
})
// expected output: defined

// Length is equal to 12
test('data contains 12 months', () => {
	expect.assertions(1);
	return calendar.getYear(epoch).then(
		(data) => expect(data[2018].length).toEqual(12)
	);
})
// expected output: 12

// Total number of days is equal to 365 or 366
test('Total number of days is equal to 365 or 366', () => {
	expect.assertions(1);
	return calendar.getYear(epoch).then(
		(data) => expect(data[2018].flat(2).length).toEqual(365 || 366)
	);
})
// expected output: 365 or 366

// Validate month day constructs against LOOKUPTABLE

// Check no value in the data is less than 0 or greater than 6

// Check data for 2018 matches 2018 calendar
test('Validate output against 2018 calendar', () => {
	expect.assertions(1);
	return calendar.getYear(epoch).then(
		(data) => expect(data[2018]).toEqual(year2018)
	);
	//return expect(Pix8Calendar.getYear(epoch).calendarYear2).resolves.toEqual(year2018);
})


//MOCK
//2018 day data
const year2018 = [
	//Jan
	[
		[1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3]
	],

	//Feb
	[
		[4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3]
	],

	//Mar
	[
		[4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6]
	],

	//Apr
	[
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1]
	],

	//May
	[
		[2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4]
	],

	//June
	[
		[5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6]
	],

	//July
	[
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2]
	],

	//Aug
	[
		[3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5]
	],

	//Sept
	[
		[6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0]
	],

	//Oct
	[
		[1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3]
	],

	//Nov
	[
		[4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5]
	],

	//Dec
	[
		[6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1, 2, 3, 4, 5, 6],
		[0, 1]
	]
]
