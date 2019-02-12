"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var moment = require("moment");

function formatDay(day, locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  return moment(day).locale(locale).format('DD.MM.YYYY, dddd');
}

function formatMonthTitle(date, locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  return moment(date).locale(locale).format('MMMM YYYY');
}

function formatWeekdayShort(day, locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  return moment().locale(locale).localeData().weekdays()[day].substr(0, 3);
}

function formatWeekdayLong(day, locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  return moment().locale(locale).localeData().weekdays()[day];
}

function getFirstDayOfWeek(locale) {
  return moment().locale(locale).localeData().firstDayOfWeek();
}

function getMonths(locale) {
  var months = [];
  var i = 0;

  while (i < 12) {
    months.push(moment().locale(locale).month(i).format('MMMM'));
    i += 1;
  }

  return months;
}

var kalenderLocaleUtils = {
  formatDay: formatDay,
  formatMonthTitle: formatMonthTitle,
  formatWeekdayLong: formatWeekdayLong,
  formatWeekdayShort: formatWeekdayShort,
  getMonths: getMonths,
  getFirstDayOfWeek: getFirstDayOfWeek
};
exports.default = kalenderLocaleUtils;