import * as moment from 'moment';
import { Moment } from 'moment';
import { Avgrensninger } from '../types';
import {
	Modifier,
	RangeModifier,
	AfterModifier,
	BeforeModifier,
	DaysOfWeekModifier,
	DayPickerProps
} from 'react-day-picker';

export * from './kalenderFokusUtils';

export const normaliserDato = (d: Date): Moment => {
	return moment(d.toISOString().substr(0, 10)).utc(true);
};

export const formatDateInputValue = (dato?: string): string => {
	return dato ? moment(dato).format('DD.MM.YYYY') : '';
};

export const dagDatoNøkkel = (dato: Date) =>
	`${moment(dato).format('DD.MM.YYYY')}`;

export const getMånedDiff = (måned1: Date, måned2: Date) =>
	moment(måned1)
		.startOf('month')
		.diff(moment(måned2).startOf('month'), 'months');

export const erMånedTilgjengelig = (
	måned: Date,
	avgrensninger?: { min?: Date; maks?: Date }
): boolean => {
	if (!avgrensninger) {
		return true;
	}
	const mnd = moment(måned);
	const { min, maks } = avgrensninger;
	const erEtterMin = min
		? mnd.endOf('month').isAfter(moment(min).startOf('month'))
		: true;
	const erFørMaks = maks
		? mnd.startOf('month').isBefore(moment(maks).endOf('month'))
		: true;
	return erEtterMin && erFørMaks;
};

export const getUtilgjengeligeDager = (
	avgrensninger: Avgrensninger
): Modifier[] => {
	let ugyldigeDager: Modifier[] = [];
	if (avgrensninger.ugyldigeTidsperioder) {
		ugyldigeDager = avgrensninger.ugyldigeTidsperioder.map(
			(t): RangeModifier => {
				return {
					from: moment(t.fom).toDate(),
					to: moment(t.tom).toDate()
				};
			}
		);
	}
	const minDato =
		avgrensninger.minDato && normaliserDato(avgrensninger.minDato);
	const maksDato =
		avgrensninger.maksDato && normaliserDato(avgrensninger.maksDato);
	const helgedager = {
		daysOfWeek: avgrensninger.helgedagerIkkeTillatt ? [0, 6] : []
	};
	return [
		...ugyldigeDager,
		...(maksDato ? [{ after: maksDato.toDate() } as AfterModifier] : []),
		...(minDato ? [{ before: minDato.toDate() } as BeforeModifier] : []),
		...[helgedager as DaysOfWeekModifier]
	];
};

export const getDefaultMåned = (
	dato: string | undefined,
	avgrensninger: Avgrensninger | undefined,
	dayPickerProps: DayPickerProps | undefined
): Date => {
	if (dato) {
		return new Date(dato);
	}
	const idag = normaliserDato(new Date()).toDate();
	if (dayPickerProps && dayPickerProps.initialMonth) {
		return dayPickerProps.initialMonth;
	}
	if (avgrensninger) {
		if (avgrensninger.minDato) {
			return moment(avgrensninger.minDato).isAfter(idag)
				? avgrensninger.minDato
				: idag;
		}
	}
	return idag;
};

export const formatInputToISOString = (input: string): string => {
	return moment.utc(input, 'DD.MM.YYYY').format('YYYY-MM-DD');
};
