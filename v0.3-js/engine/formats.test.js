import test from 'ava';
import formatTime from './formats';

test('format in years', (t) => {
  is(formatTime(400), '1 Year, 35 days');
});
