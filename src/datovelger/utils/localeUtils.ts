import { LocaleUtils } from 'react-day-picker';
import moment from 'moment';
import { dateToInputDateString } from './dateFormatUtils';

function formatDay(day: Date, locale = 'en') {
    return moment(day).locale(locale).format('DD.MM.YYYY, dddd');
}

function formatMonthTitle(date: Date, locale = 'en') {
    return moment(date).locale(locale).format('MMMM YYYY');
}

function formatWeekdayShort(day: number, locale = 'en') {
    return moment().locale(locale).localeData().weekdays()[day].substr(0, 3);
}

function formatWeekdayLong(day: number, locale = 'en') {
    return moment().locale(locale).localeData().weekdays()[day];
}

function getFirstDayOfWeek(locale) {
    return moment().locale(locale).localeData().firstDayOfWeek();
}

function getMonths(locale) {
    const months: string[] = [];
    let i = 0;
    while (i < 12) {
        months.push(moment().locale(locale).month(i).format('MMMM'));
        i += 1;
    }
    return months as any;
}

const kalenderLocaleUtils: LocaleUtils = {
    formatDay,
    formatMonthTitle,
    formatWeekdayLong,
    formatWeekdayShort,
    getMonths,
    getFirstDayOfWeek,
    formatDate: (date) => dateToInputDateString(date) || '',
    parseDate: (d) => moment.utc(d).toDate(),
};

export default kalenderLocaleUtils;
