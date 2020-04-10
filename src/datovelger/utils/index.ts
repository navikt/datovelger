import {
    AfterModifier,
    BeforeModifier,
    DayPickerProps,
    DaysOfWeekModifier,
    Modifier,
    RangeModifier,
} from 'react-day-picker';
import moment from 'moment';
import { DatovelgerAvgrensninger } from '../types';
import { INPUT_DATE_STRING_FORMAT, ISO_DATE_STRING_FORMAT, ISODateStringToUTCDate } from './dateFormatUtils';

export const dagDatoNøkkel = (dato: Date) => moment(dato).format(INPUT_DATE_STRING_FORMAT);

export const getUtilgjengeligeDager = (avgrensninger: DatovelgerAvgrensninger): Modifier[] => {
    let ugyldigeDager: Modifier[] = [];
    if (avgrensninger.ugyldigeTidsperioder) {
        ugyldigeDager = avgrensninger.ugyldigeTidsperioder
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
    const minDato = avgrensninger.minDato;
    const maksDato = avgrensninger.maksDato;
    const helgedager = {
        daysOfWeek: avgrensninger.helgedagerIkkeTillatt ? [0, 6] : [],
    };
    return [
        ...ugyldigeDager,
        ...(maksDato ? [{ after: moment(maksDato, ISO_DATE_STRING_FORMAT).toDate() } as AfterModifier] : []),
        ...(minDato ? [{ before: moment(minDato, ISO_DATE_STRING_FORMAT).toDate() } as BeforeModifier] : []),
        ...[helgedager as DaysOfWeekModifier],
    ];
};

export const getDefaultMåned = (
    dato: string | undefined,
    avgrensninger: DatovelgerAvgrensninger | undefined,
    dayPickerProps: DayPickerProps | undefined
): Date => {
    const d = moment.utc(dato, ISO_DATE_STRING_FORMAT, true);
    if (dato && d.isValid()) {
        return d.toDate();
    }

    if (dayPickerProps && dayPickerProps.initialMonth) {
        return dayPickerProps.initialMonth;
    }

    const idag = moment().toDate();
    if (avgrensninger && avgrensninger.minDato) {
        return moment(avgrensninger.minDato).isAfter(idag)
            ? moment(avgrensninger.minDato, ISO_DATE_STRING_FORMAT).toDate()
            : idag;
    }
    return idag;
};
