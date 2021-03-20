const parseStr = str => {
  const split = str.split('-');
  const day = split.pop();
  const month = split.join('-');
  const res = { month, days: [day] };
  return res;
};

const parseStrArray = array => array.map(item => parseStr(item));

const parseObjArray = array => {
  return array.reduce((accum, item) => {
    if (!accum.length || item.month !== accum[accum.length - 1].month) {
      accum.push(item);
      return accum;
    }
    accum[accum.length - 1].days.push(item.days[0]);
    return accum;
  }, []);
};

function arrayToString(array) {
  if (array.length === 1) return '-' + array[0];
  return '(' + array.join(', ') + ')';
}

function toString(array) {
  return array.map(item => item.month + arrayToString(item.days)).join(', \n');
}

export function datesToString(dates) {
  return toString(parseObjArray(parseStrArray(dates.sort())));
}