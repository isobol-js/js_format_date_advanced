'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const datePartsKeys = ['YYYY', 'YY', 'MM', 'DD'];

  const fromSeparator = fromFormat.find(f => !datePartsKeys.includes(f));

  const fromIndexes = {
    YYYY: fromFormat.indexOf('YYYY'),
    YY: fromFormat.indexOf('YY'),
    MM: fromFormat.indexOf('MM'),
    DD: fromFormat.indexOf('DD'),
  };

  const datePartsArray = date.split(fromSeparator);

  let dateParts = {};

  if (fromIndexes.YYYY !== -1) {
    dateParts.YYYY = datePartsArray[fromIndexes.YYYY];
  }
  if (fromIndexes.YY !== -1) {
    dateParts.YY = datePartsArray[fromIndexes.YY];
  }
  if (fromIndexes.MM !== -1) {
    dateParts.MM = datePartsArray[fromIndexes.MM];
  }
  if (fromIndexes.DD !== -1) {
    dateParts.DD = datePartsArray[fromIndexes.DD];
  }

  if (dateParts.YY && !dateParts.YYYY) {
    const yy = Number(dateParts.YY);
    dateParts.YYYY = yy < 30 ? '20' + dateParts.YY : '19' + dateParts.YY;
  }
  if (dateParts.YYYY && !dateParts.YY) {
    dateParts.YY = dateParts.YYYY.slice(-2);
  }

  let resultParts = toFormat.map(part => {
    if (part === 'YYYY') {
      return dateParts.YYYY;
    }
    if (part === 'YY') {
      return dateParts.YY;
    }
    if (part === 'MM') {
      return dateParts.MM;
    }
    if (part === 'DD') {
      return dateParts.DD;
    }
    return part;
  });

  return resultParts.join('');
}

module.exports = formatDate;
