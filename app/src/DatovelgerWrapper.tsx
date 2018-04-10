import * as React from 'react';
import * as moment from 'moment';

import Datovelger from '../../src/datovelger';

import { KalenderPlassering, Avgrensninger } from '../../src/datovelger/types';
import { validerDato } from '../../src/datovelger/utils/datovalidering';

export interface Props {}

export interface State {
	dato: Date | undefined;
	inputValue: string;
	error: string | undefined;
	avgrensninger: Avgrensninger;
	plassering: KalenderPlassering;
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
		const { dato } = this.state;
		const valgtDato = dato ? dato.toDateString() : 'ingen gyldig dato valgt';

		return (
			<form action="#" onSubmit={this.handleSubmit}>
				<div className="datovelger">
					<div className="blokk-xxs">
						<label htmlFor="datoinput">Velg dato</label>
					</div>
					<Datovelger
						id="datoinput"
						dato={this.state.dato}
						onChange={(d: Date) => this.oppdaterDato(d)}
						avgrensninger={this.state.avgrensninger}
						inputProps={{
							placeholder: 'dd.mm.åååå'
						}}
						kalenderplassering={this.state.plassering}
					/>
					<fieldset>
						<legend>Props</legend>
						<label htmlFor="plassering-under">
							<input
								id="plassering-under"
								type="radio"
								name="plassering"
								value="under"
								checked={this.state.plassering === 'under'}
								onChange={() => this.setState({ plassering: 'under' })}
							/>
							Under
						</label>
						<label htmlFor="plassering-fullskjerm">
							<input
								id="plassering-fullskjerm"
								type="radio"
								name="plassering"
								value="fullskjerm"
								checked={this.state.plassering === 'fullskjerm'}
								onChange={() => this.setState({ plassering: 'fullskjerm' })}
							/>
							Fullskjerm
						</label>
					</fieldset>
					<hr />
				</div>
				<p>Valgt dato: {valgtDato}</p>
				<p>Validering: {this.state.error}</p>
				<hr />
			</form>
		);
	}
}

export default DatovelgerWrapper;
