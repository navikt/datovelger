import {
    AfterModifier,
    BeforeModifier,
    DayPickerProps,
    DaysOfWeekModifier,
    Modifier,
    RangeModifier,
} from 'react-day-picker';
import moment from 'moment';
import { DatepickerLimitations } from '../types';
import { INPUT_DATE_STRING_FORMAT, ISO_DATE_STRING_FORMAT, ISODateStringToUTCDate } from './dateFormatUtils';

export const dayDateKey = (dato: Date) => moment(dato).format(INPUT_DATE_STRING_FORMAT);

export const getInvalidDates = (limitations: DatepickerLimitations): Modifier[] => {
    let invalidDates: Modifier[] = [];
    if (limitations.invalidDateRanges) {
        invalidDates = limitations.invalidDateRanges
            .map((t): RangeModifier | undefined => {
                const from = ISODateStringToUTCDate(t.fom);
                const to = ISODateStringToUTCDate(t.tom);
                if (from && to) {
                    return {
                        from,
                        to,
                    };
                }
                return undefined;
            })
            .filter((t) => t !== undefined);
    }
    const minDate = limitations.minDate;
    const maxDate = limitations.maxDate;
    const weekendDays = {
        daysOfWeek: limitations.weekendsNotSelectable ? [0, 6] : [],
    };
    return [
        ...invalidDates,
        ...(maxDate ? [{ after: moment(maxDate, ISO_DATE_STRING_FORMAT).toDate() } as AfterModifier] : []),
        ...(minDate ? [{ before: moment(minDate, ISO_DATE_STRING_FORMAT).toDate() } as BeforeModifier] : []),
        ...[weekendDays as DaysOfWeekModifier],
    ];
};

export const getDefaultMonth = (
    dateString: string | undefined,
    limitations: DatepickerLimitations | undefined,
    dayPickerProps: DayPickerProps | undefined
): Date => {
    const d = moment.utc(dateString, ISO_DATE_STRING_FORMAT, true);
    if (dateString && d.isValid()) {
        return d.toDate();
    }
    if (dayPickerProps && dayPickerProps.initialMonth) {
        return dayPickerProps.initialMonth;
    }
    const today = moment().toDate();
    if (limitations && limitations.minDate) {
        return moment(limitations.minDate).isAfter(today)
            ? moment(limitations.minDate, ISO_DATE_STRING_FORMAT).toDate()
            : today;
    }
    return today;
};
