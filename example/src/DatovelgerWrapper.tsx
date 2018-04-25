import * as React from 'react';
import * as moment from 'moment';

import Datovelger from '../../src/datovelger/Datovelger';

import { KalenderPlassering, Avgrensninger } from '../../src/datovelger/types';
import { validerDato } from '../../src/datovelger/utils/datovalidering';
import Periodevelger from '../../src/datovelger/Periodevelger';

export interface Props {}

export interface State {
	dato: Date | undefined;
	inputValue: string;
	error: string | undefined;
	avgrensninger: Avgrensninger;
	plassering: KalenderPlassering;
	startdato?: Date;
	sluttdato?: Date;
}

class DatovelgerWrapper extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.oppdaterDato = this.oppdaterDato.bind(this);
		this.addDay = this.addDay.bind(this);
		this.state = {
			dato: undefined,
			inputValue: '',
			error: '',
			plassering: 'under',
			avgrensninger: {
				minDato: moment()
					.add(10, 'days')
					.toDate(),
				maksDato: moment()
					.add(24, 'months')
					.toDate(),
				helgedagerIkkeTillatt: true,
				ugyldigeTidsperioder: [
					{
						startdato: new Date(2018, 2, 15),
						sluttdato: new Date(2018, 2, 22)
					}
				]
			}
		};
	}

	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.stopPropagation();
		e.preventDefault();
		alert('Valgt dato er: ' + this.state.dato);
	}

	oppdaterDato(dato?: Date) {
		this.setState({
			dato,
			error: validerDato(dato, this.state.avgrensninger)
		});
	}

	addDay(days: number) {
		if (this.state.dato) {
			this.setState({
				dato: moment(this.state.dato)
					.add(days, 'days')
					.toDate()
			});
		}
	}

	render() {
		const { dato, sluttdato, startdato } = this.state;
		const datotype = typeof dato;
		const valgtDato =
			dato && (datotype as string) == 'Date'
				? dato.toDateString()
				: 'ingen gyldig dato valgt';

		return (
			<form action="#" onSubmit={this.handleSubmit}>
				<div className="datovelger">
					<div className="blokk-xxs">
						<label htmlFor="datoinput">Velg dato</label>
					</div>
					<Datovelger
						input={{
							id: 'datoinput',
							onChange: (value, evt) => console.log(value),
							placeholder: 'dd.mm.åååå'
						}}
						kalender={{
							plassering: this.state.plassering
						}}
						dato={this.state.dato}
						onChange={(d: Date) => this.oppdaterDato(d)}
						avgrensninger={this.state.avgrensninger}
						kanVelgeUgyldigDato={true}
					/>
				</div>
				<hr />
				<p>Valgt dato: {valgtDato}</p>
				<p>Validering: {this.state.error}</p>
				<hr />
				<h2>Periodevelger</h2>
				<Periodevelger
					startInputProps={{
						id: 'start',
						placeholder: 'dd.mm.åååå'
					}}
					sluttInputProps={{
						id: 'slutt',
						placeholder: 'dd.mm.åååå'
					}}
					startdato={startdato}
					sluttdato={sluttdato}
					avgrensninger={this.state.avgrensninger}
					onChange={(startdato, sluttdato) =>
						this.setState({ startdato, sluttdato })
					}
				/>
			</form>
		);
	}
}

export default DatovelgerWrapper;
