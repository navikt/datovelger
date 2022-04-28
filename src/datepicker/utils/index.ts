import {
    AfterModifier,
    BeforeModifier,
    DayPickerProps,
    DaysOfWeekModifier,
    Modifier,
    RangeModifier,
} from 'react-day-picker';
import dayjs from 'dayjs';
import { DatepickerLimitations } from '../types';
import { INPUT_DATE_STRING_FORMAT, ISO_DATE_STRING_FORMAT, ISODateStringToUTCDate } from './dateFormatUtils';

export const dayDateKey = (date: Date) => dayjs(date).format(INPUT_DATE_STRING_FORMAT);

export const getInvalidDates = (limitations: DatepickerLimitations): Modifier[] => {
    let invalidDates: Modifier[] = [];
    if (limitations.invalidDateRanges) {
        invalidDates = limitations.invalidDateRanges
            .map((t): RangeModifier | undefined => {
                const from = ISODateStringToUTCDate(t.from);
                const to = ISODateStringToUTCDate(t.to);
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
    const disabledWeekdays: DaysOfWeekModifier = {
        daysOfWeek: [
            ...(limitations.weekendsNotSelectable ? [0, 6] : []),
            ...(limitations.disabledDaysOfWeek?.daysOfWeek || []),
        ],
    };
    return [
        ...invalidDates,
        ...(maxDate ? [{ after: dayjs(maxDate, ISO_DATE_STRING_FORMAT).toDate() } as AfterModifier] : []),
        ...(minDate ? [{ before: dayjs(minDate, ISO_DATE_STRING_FORMAT).toDate() } as BeforeModifier] : []),
        ...[disabledWeekdays],
    ];
};

export const isSameDate = (d1: Date, d2: Date) => {
    return dayjs(d1).isSame(d2, 'day');
};

export const getDefaultMonth = (
    dateString: string | undefined,
    limitations: DatepickerLimitations | undefined,
    dayPickerProps: DayPickerProps | undefined
): Date => {
    const d = dayjs(dateString).utc(true).format(ISO_DATE_STRING_FORMAT);
    if (dateString && dayjs(d).isValid()) {
        return dayjs(d).toDate();
    }
    if (dayPickerProps && dayPickerProps.initialMonth) {
        return dayPickerProps.initialMonth;
    }
    const today = dayjs().toDate();
    if (limitations && limitations.minDate) {
        return dayjs(limitations.minDate).isAfter(today)
            ? dayjs(limitations.minDate, ISO_DATE_STRING_FORMAT).toDate()
            : today;
    }
    return today;
};
