import dayjs from 'dayjs';
import DateHolidays, { HolidaysTypes } from 'date-holidays';

const norwegianHolidays = new DateHolidays('no');

export const getPublicHolidays = (from: Date, to: Date): HolidaysTypes.Holiday[] => {
    let days = [] as HolidaysTypes.Holiday[];
    const fromYear = from.getFullYear();
    const toYear = to.getFullYear();
    if (fromYear === toYear) {
        days = norwegianHolidays.getHolidays(fromYear);
    } else {
        let år = fromYear;
        while (år <= toYear) {
            days = [...days, ...norwegianHolidays.getHolidays(år)];
            år++;
        }
    }
    const start = dayjs(from).subtract(24, 'hour');
    const slutt = dayjs(to).add(24, 'hour');
    return days
        .filter((d) => d.type === 'public')
        .map((d) => ({
            ...d,
            date: d.date,
        }))
        .filter((d) => dayjs(d.date).isAfter(start, 'day') && dayjs(d.date).isBefore(slutt, 'day'));
};

export const getPublicHolidaysInMonth = (month: Date): HolidaysTypes.Holiday[] => {
    const days: HolidaysTypes.Holiday[] = norwegianHolidays.getHolidays(month.getFullYear());
    const from = dayjs(month).startOf('month');
    const to = dayjs(month).endOf('month');
    return days
        .filter((d) => d.type === 'public')
        .filter((d) => dayjs(d.date).isAfter(from, 'day') && dayjs(d.date).isBefore(to, 'day'));
};

/* Default - hente ut helligdager i default tidsrom */
export const holidays = getPublicHolidays(dayjs().subtract(4, 'year').toDate(), dayjs().add(4, 'year').toDate());

export const isPublicHoliday = (date: Date): string | undefined => {
    const holiday = holidays.find((day) => dayjs(new Date(day.date)).isSame(date, 'day'));
    return holiday ? holiday.name : undefined;
};
