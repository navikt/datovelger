import * as React from 'react';
import { DatovelgerCommonProps, DateInputProps, Tidsperiode } from '.';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import { getDefaultMåned, getUtilgjengeligeDager } from './utils';
import KalenderPortal from './elementer/KalenderPortal';
import Kalender from './kalender/Kalender';
import { RangeModifier } from 'react-day-picker';
// import { RangeModifier } from 'react-day-picker';

// import { RangeModifier } from 'react-day-picker';
export interface NyPeriode {
	startdato?: Date;
	sluttdato?: Date;
}

export interface Props extends DatovelgerCommonProps {
	periode?: Tidsperiode;
	startInput: DateInputProps;
	sluttInput: DateInputProps;
	onChange: (periode: Tidsperiode) => void;
}

export interface State {
	måned: Date;
	startInputValue: string;
	sluttInputValue: string;
	erÅpen?: boolean;
	nyPeriode?: NyPeriode;
	tildato?: Date;
}

const trimInputProps = (props: DateInputProps) => {
	const { onChange, ...rest } = props;
	return rest;
};

class Periodevelger extends React.Component<Props, State> {
	startInput: Datoinput | null;
	sluttInput: Datoinput | null;
	startKalenderKnapp: KalenderKnapp | null;
	sluttKalenderKnapp: KalenderKnapp | null;
	kalender: Kalender | null;
	setFokusPåKalenderKnapp: boolean | undefined;

	constructor(props: Props) {
		super(props);

		this.onStartdateChange = this.onStartdateChange.bind(this);
		this.onStartInputChange = this.onStartInputChange.bind(this);
		this.onSluttdateChange = this.onSluttdateChange.bind(this);
		this.onSluttInputChange = this.onSluttInputChange.bind(this);
		this.toggleKalender = this.toggleKalender.bind(this);
		this.onVelgDato = this.onVelgDato.bind(this);
		this.lukkKalender = this.lukkKalender.bind(this);
		this.getSelectedDays = this.getSelectedDays.bind(this);

		this.state = {
			måned: getDefaultMåned(
				props.periode ? props.periode.startdato : undefined,
				props.avgrensninger
			),
			erÅpen: false,
			startInputValue: '',
			sluttInputValue: '',
			tildato: undefined,
			nyPeriode: undefined
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (
			nextProps.periode &&
			nextProps.periode.startdato &&
			nextProps.periode.sluttdato
		) {
			this.setState({
				nyPeriode: { ...nextProps.periode }
			});
		} else {
			this.setState({
				nyPeriode: undefined
			});
		}
	}

	onStartdateChange(dato: Date) {
		// console.log(dato);
		// this.setState({
		// 	startDato: dato
		// });
	}
	onStartInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>) {}
	onSluttdateChange(dato: Date) {
		// this.setState({
		// 	sluttDato: dato
		// });
	}
	onSluttInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>) {}
	onVelgDato(dato: Date, lukkKalender?: boolean) {
		const { nyPeriode } = this.state;
		if (!nyPeriode) {
			this.setState({
				nyPeriode: {
					startdato: dato
				}
			});
		} else if (nyPeriode && !nyPeriode.sluttdato) {
			this.setState({
				nyPeriode: undefined
			});
			this.props.onChange({
				startdato: nyPeriode.startdato,
				sluttdato: dato
			} as Tidsperiode);
			this.lukkKalender();
		} else {
			this.setState({
				nyPeriode: {
					startdato: dato
				}
			});
		}
	}
	toggleKalender(start?: Date) {
		this.setFokusPåKalenderKnapp = true;
		this.setState({
			erÅpen: !this.state.erÅpen,
			nyPeriode: start ? { startdato: start } : undefined,
			tildato: start
				? this.props.periode
					? this.props.periode.sluttdato
					: undefined
				: undefined
		});
	}

	lukkKalender(settFokusPåKalenderknapp?: boolean) {
		this.setState({ erÅpen: false, tildato: undefined });
		this.setFokusPåKalenderKnapp = settFokusPåKalenderknapp;
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (!prevState.erÅpen && this.state.erÅpen && this.kalender) {
			this.kalender.settFokus();
		} else if (
			prevState.erÅpen &&
			!this.state.erÅpen &&
			this.setFokusPåKalenderKnapp &&
			this.startKalenderKnapp
		) {
			this.setFokusPåKalenderKnapp = false;
			this.startKalenderKnapp.focus();
		}
	}

	getSelectedDays() {
		const { nyPeriode, tildato } = this.state;
		if (nyPeriode && nyPeriode.startdato && nyPeriode.sluttdato) {
			return [
				nyPeriode.startdato,
				{
					from: nyPeriode.startdato,
					to: nyPeriode.sluttdato
				} as RangeModifier
			];
		} else if (
			nyPeriode &&
			nyPeriode.startdato &&
			!nyPeriode.sluttdato &&
			tildato
		) {
			return [
				nyPeriode.startdato,
				{
					from: nyPeriode.startdato,
					to: tildato
				} as RangeModifier
			];
		}
		return [];
	}

	render() {
		const {
			periode = { startdato: undefined, sluttdato: undefined },
			kalender,
			avgrensninger,
			locale = 'nb',
			kanVelgeUgyldigDato = false,
			startInput,
			sluttInput,
			...kalenderProps
		} = this.props;

		const { erÅpen, nyPeriode, tildato } = this.state;

		let mod;
		if (nyPeriode && tildato) {
			mod = {
				start: nyPeriode.startdato,
				end: tildato
			};
		}
		const dayPickerProps = {
			...this.props.dayPickerProps,
			modifiers: mod,
			onDayMouseEnter: (dato: Date) => {
				if (
					this.state.nyPeriode &&
					this.state.nyPeriode.startdato &&
					!this.state.nyPeriode.sluttdato
				) {
					this.setState({ tildato: dato });
				}
			},
			selectedDays: this.getSelectedDays(),
			numberOfMonths: 2,
			className: 'DayPicker--range'
		};
		return (
			<div className="nav-datovelger">
				<div className="nav-datovelger__periode">
					<div className="nav-datovelger__periode__startInput">
						<div className="nav-datovelger__inputContainer">
							<Datoinput
								inputProps={trimInputProps(startInput)}
								ref={(c) => (this.startInput = c)}
								date={nyPeriode ? nyPeriode.startdato : periode.startdato}
								onDateChange={this.onStartdateChange}
								onInputChange={this.onStartInputChange}
							/>
							<KalenderKnapp
								ref={(c) => (this.startKalenderKnapp = c)}
								onClick={this.toggleKalender}
								erÅpen={erÅpen || false}
							/>
						</div>
					</div>
					<div className="nav-datovelger__periode__sluttInput">
						<div className="nav-datovelger__inputContainer">
							<Datoinput
								inputProps={trimInputProps(sluttInput)}
								ref={(c) => (this.sluttInput = c)}
								date={periode.sluttdato}
								onDateChange={this.onSluttdateChange}
								onInputChange={this.onSluttInputChange}
							/>
							<KalenderKnapp
								ref={(c) => (this.sluttKalenderKnapp = c)}
								onClick={() =>
									this.toggleKalender(
										this.props.periode
											? this.props.periode.startdato
											: undefined
									)
								}
								erÅpen={erÅpen || false}
							/>
						</div>
					</div>
					{erÅpen && (
						<KalenderPortal plassering={kalender && kalender.plassering}>
							<Kalender
								ref={(c) => (this.kalender = c)}
								{...kalenderProps}
								locale={locale}
								måned={this.state.måned}
								min={avgrensninger && avgrensninger.minDato}
								maks={avgrensninger && avgrensninger.maksDato}
								utilgjengeligeDager={
									avgrensninger
										? getUtilgjengeligeDager(avgrensninger)
										: undefined
								}
								onVelgDag={(d) => this.onVelgDato(d, true)}
								onLukk={() => this.lukkKalender(true)}
								kanVelgeUgyldigDato={kanVelgeUgyldigDato}
								dayPickerProps={dayPickerProps}
							/>
						</KalenderPortal>
					)}
				</div>
			</div>
		);
	}
}
export default Periodevelger;
