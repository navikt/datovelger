import { LocaleUtils } from 'react-day-picker';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import { dateToInputDateString } from './dateFormatUtils';

dayjs.extend(localeData);
dayjs.extend(utc);

function formatDay(day: Date, locale = 'nb') {
    return dayjs(day).locale(locale).format('DD.MM.YYYY, dddd');
}

function formatMonthTitle(date: Date, locale = 'nb') {
    return dayjs(date).locale(locale).format('MMMM YYYY');
}

function formatWeekdayShort(day: number, locale = 'nb') {
    return dayjs().locale(locale).localeData().weekdays()[day].substr(0, 3);
}

function formatWeekdayLong(day: number, locale = 'nb') {
    return dayjs().locale(locale).localeData().weekdays()[day];
}

function getFirstDayOfWeek(locale = 'nb') {
    return dayjs().locale(locale).localeData().firstDayOfWeek();
}

function getMonths(locale = 'nb') {
    const months: string[] = [];
    let i = 0;
    while (i < 12) {
        months.push(dayjs().locale(locale).month(i).format('MMMM'));
        i += 1;
    }
    return months as any;
}

const calendarLocaleUtils: LocaleUtils = {
    formatDay,
    formatMonthTitle,
    formatWeekdayLong,
    formatWeekdayShort,
    getMonths,
    getFirstDayOfWeek,
    formatDate: (date) => dateToInputDateString(date) || '',
    parseDate: (d) => dayjs.utc(d).toDate(),
};

export default calendarLocaleUtils;
