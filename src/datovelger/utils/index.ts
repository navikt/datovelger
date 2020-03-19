import {
    AfterModifier, BeforeModifier, DayPickerProps, DaysOfWeekModifier, Modifier, RangeModifier
} from 'react-day-picker';
import moment from 'moment';
import { DatovelgerAvgrensninger } from '../types';

export * from './kalenderFokusUtils';

export const formatDateInputValue = (dato: string): string => {
    const d = moment(dato, moment.HTML5_FMT.DATE, true);
    return d.isValid() ? d.format('DD.MM.YYYY') : dato;
};

const apiDateFormat = 'YYYY-MM-DD';

export const dateToISOFormattedDateString = (date?: Date) =>
    date ? moment.utc(date).format(apiDateFormat) : undefined;

export const getDateStringFromValue = (value: Date | string): string | undefined => {
    let date;
    if (value && typeof value === 'string') {
        if (moment(value, moment.ISO_8601, true).isValid()) {
            date = moment(value).toDate();
        }
    } else if (typeof value === 'object') {
        date = value;
    }
    return date ? dateToISOFormattedDateString(date) : undefined;
};

export const formatInputToISODateFormatStrig = (input: string): string | 'Invalid Date' => {
    const d = moment.utc(input, 'DD.MM.YYYY', true);
    return d.isValid() ? d.format(moment.HTML5_FMT.DATE) : d.toString();
};

export const dagDatoNøkkel = (dato: Date) => moment(dato).format('DD.MM.YYYY');

export const getMånedDiff = (måned1: Date, måned2: Date) =>
    moment(måned1)
        .startOf('month')
        .diff(moment(måned2).startOf('month'), 'months');

export const erMånedTilgjengelig = (måned: Date, avgrensninger?: { min?: string; maks?: string }): boolean => {
    if (!avgrensninger) {
        return true;
    }
    const mnd = moment(måned);
    const { min, maks } = avgrensninger;
    const erEtterMin = min ? mnd.endOf('month').isAfter(moment(min).startOf('month')) : true;
    const erFørMaks = maks ? mnd.startOf('month').isBefore(moment(maks).endOf('month')) : true;
    return erEtterMin && erFørMaks;
};

export const getUtilgjengeligeDager = (avgrensninger: DatovelgerAvgrensninger): Modifier[] => {
    let ugyldigeDager: Modifier[] = [];
    if (avgrensninger.ugyldigeTidsperioder) {
        ugyldigeDager = avgrensninger.ugyldigeTidsperioder.map(
            (t): RangeModifier => {
                return {
                    from: moment(t.fom, moment.HTML5_FMT.DATE).toDate(),
                    to: moment(t.tom, moment.HTML5_FMT.DATE).toDate()
                };
            }
        );
    }
    const minDato = avgrensninger.minDato;
    const maksDato = avgrensninger.maksDato;
    const helgedager = {
        daysOfWeek: avgrensninger.helgedagerIkkeTillatt ? [0, 6] : []
    };
    return [
        ...ugyldigeDager,
        ...(maksDato ? [{ after: moment(maksDato, moment.HTML5_FMT.DATE).toDate() } as AfterModifier] : []),
        ...(minDato ? [{ before: moment(minDato, moment.HTML5_FMT.DATE).toDate() } as BeforeModifier] : []),
        ...[helgedager as DaysOfWeekModifier]
    ];
};

export const getDefaultMåned = (
    dato: string | undefined,
    avgrensninger: DatovelgerAvgrensninger | undefined,
    dayPickerProps: DayPickerProps | undefined
): Date => {
    const d = moment.utc(dato, moment.HTML5_FMT.DATE, true);
    if (dato && d.isValid()) {
        return d.toDate();
    }

    if (dayPickerProps && dayPickerProps.initialMonth) {
        return dayPickerProps.initialMonth;
    }

    const idag = moment().toDate();
    if (avgrensninger && avgrensninger.minDato) {
        return moment(avgrensninger.minDato).isAfter(idag)
            ? moment(avgrensninger.minDato, moment.HTML5_FMT.DATE).toDate()
            : idag;
    }
    return idag;
};
