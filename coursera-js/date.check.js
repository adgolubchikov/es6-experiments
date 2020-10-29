var date = require('./date.js');

var time = date('2017-05-16 13:45')

.add(24, 'hours')

.subtract(1, 'months')

.add(3, 'days')

.add(5, 'minutes');

console.info(time.value);

// "2017-04-20 14:00"
