import { LocaleUtils } from 'react-day-picker';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import { dateToInputDateString } from './dateFormatUtils';

dayjs.extend(localeData);
dayjs.extend(utc);

function formatDay(day: Date) {
    return dayjs(day).format('DD.MM.YYYY, dddd');
}

function formatMonthTitle(date: Date) {
    return dayjs(date).format('MMMM YYYY');
}

function formatWeekdayShort(day: number) {
    return dayjs().localeData().weekdays()[day].substr(0, 3);
}

function formatWeekdayLong(day: number) {
    return dayjs().localeData().weekdays()[day];
}

function getFirstDayOfWeek() {
    return dayjs().localeData().firstDayOfWeek();
}

function getMonths() {
    const months: string[] = [];
    let i = 0;
    while (i < 12) {
        months.push(dayjs().month(i).format('MMMM'));
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
