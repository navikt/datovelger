import * as React from 'react';
import { Avgrensninger } from '../types';
import { formatDateInputValue } from '../utils';
import { Tekster } from '../tekster';

export interface Props {
	id: string;
	avgrensninger: Avgrensninger;
}

const AvgrensningerInfo: React.StatelessComponent<Props> = ({
	id,
	avgrensninger
}) => {
	if (!avgrensninger.minDato && !avgrensninger.maksDato) {
		return null;
	}

	let msg = '';
	const fraDato = formatDateInputValue(avgrensninger.minDato);
	const tilDato = formatDateInputValue(avgrensninger.maksDato);
	if (avgrensninger.minDato && avgrensninger.maksDato) {
		msg = `${Tekster.avgrensninger.måVæreMellom(fraDato, tilDato)}. `;
	} else {
		if (avgrensninger.minDato) {
			msg = `${Tekster.avgrensninger.fra(fraDato)}. `;
		}
		if (avgrensninger.maksDato) {
			msg = `${Tekster.avgrensninger.til(tilDato)}. `;
		}
	}
	if (avgrensninger.helgedagerIkkeTillatt) {
		msg = `${msg} ${Tekster.avgrensninger.helg}. `;
	}

	return (
		<p className="sr-only" id={id}>
			{msg}
		</p>
	);
};

export default AvgrensningerInfo;
