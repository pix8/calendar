import Pix8Calendar from './Calendar'


var calendar = new Pix8Calendar();

//SPECS
// TEST DATE = 1st December 2018
var epoch = new Date(2018, 11, 1);

// Return exists
test('data exists', () => {
	expect.assertions(1);
	return calendar.getWeek(epoch).then(
		(data) => expect(data).toBeDefined()
	);
})
// expected output: defined


//MOCK
const epoch_2018_week1 = []
