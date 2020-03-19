import { LocaleUtils } from 'react-day-picker/types/utils';
import moment from 'moment';
import { dateToISOFormattedDateString } from '../utils/index';

function formatDay(day: Date, locale: string = 'en') {
    return moment(day)
        .locale(locale)
        .format('DD.MM.YYYY, dddd');
}

function formatMonthTitle(date: Date, locale: string = 'en') {
    return moment(date)
        .locale(locale)
        .format('MMMM YYYY');
}

function formatWeekdayShort(day: number, locale: string = 'en') {
    return moment()
        .locale(locale)
        .localeData()
        .weekdays()
        [day].substr(0, 3);
}

function formatWeekdayLong(day: number, locale: string = 'en') {
    return moment()
        .locale(locale)
        .localeData()
        .weekdays()[day];
}

function getFirstDayOfWeek(locale: string) {
    return moment()
        .locale(locale)
        .localeData()
        .firstDayOfWeek();
}

function getMonths(locale: string) {
    const months: string[] = [];
    let i = 0;
    while (i < 12) {
        months.push(
            moment()
                .locale(locale)
                .month(i)
                .format('MMMM')
        );
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
    formatDate: (date) => dateToISOFormattedDateString(date)!,
    parseDate: (d) => moment(d).toDate()
};

export default kalenderLocaleUtils;
