import * as React from 'react';
import { DatovelgerCommonProps, DateInputProps } from './Datovelger';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import { getUtilgjengeligeDager } from './utils';
import KalenderPortal from './elementer/KalenderPortal';
import Kalender from './kalender/Kalender';
import { RangeModifier, DayModifiers, Modifier } from 'react-day-picker';
import * as moment from 'moment';

export interface Props extends DatovelgerCommonProps {
	startdato?: string;
	sluttdato?: string;
	startInputProps: DateInputProps;
	sluttInputProps: DateInputProps;
	onChange: (fra: string, til: string) => void;
}

export interface State {
	måned: Date;
	erÅpen?: boolean;
	fra?: string;
	til?: string;
	hoverTil?: string;
	inputTarget?: 'fra' | 'til';
}

const trimInputProps = (
	componentId: string,
	id: string,
	props?: DateInputProps
) => {
	const standardProps = {
		id: `${componentId}_${id}`
	};
	if (!props) {
		return standardProps;
	}
	const { onChange, ariaDescribedby, ariaLabel, ...rest } = props;
	return {
		...standardProps,
		'aria-describedby': ariaDescribedby,
		'aria-label': ariaLabel,
		...rest
	};
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
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.lukkKalender = this.lukkKalender.bind(this);
		this.getSelectedDays = this.getSelectedDays.bind(this);
		this.onDayFocus = this.onDayFocus.bind(this);

		this.state = {
			måned: new Date(),
			erÅpen: false,
			fra: props.startdato,
			til: props.sluttdato
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		this.setState({
			fra: nextProps.startdato,
			til: nextProps.sluttdato,
			hoverTil: undefined
		});
	}

	onStartdateChange(fra: string) {
		this.setState({
			fra
		});
		const { sluttdato } = this.props;
		const { til } = this.state;
		if (sluttdato !== undefined || til !== undefined) {
			this.props.onChange(fra, sluttdato || til);
		}
	}

	onStartInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.startInputProps && this.props.startInputProps.onChange) {
			this.props.startInputProps.onChange(verdi, evt);
		}
	}

	onSluttdateChange(til: string) {
		this.setState({
			til
		});
		const { startdato } = this.props;
		const { fra } = this.state;
		if (startdato !== undefined || fra !== undefined) {
			this.props.onChange(startdato || fra, til);
		}
	}

	onSluttInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.sluttInputProps && this.props.sluttInputProps.onChange) {
			this.props.sluttInputProps.onChange(verdi, evt);
		}
	}

	onVelgDato(dato: string, lukkKalender?: boolean) {
		const { fra, til } = this.state;
		if (fra && til) {
			this.setState({
				fra: dato,
				til: undefined,
				hoverTil: this.props.sluttdato,
				inputTarget: 'til'
			});
		}
		if (!fra) {
			this.setState({
				fra: dato,
				til: this.props.sluttdato,
				inputTarget: 'til'
			});
		} else if (fra && !til) {
			const f = moment.min(moment(fra), moment(dato)).format('YYYY-MM-DD');
			const t = moment.max(moment(fra), moment(dato)).format('YYYY-MM-DD');
			this.setState({
				fra: f,
				til: t
			});
			this.props.onChange(f, t);
			this.lukkKalender();
		}
	}

	onMouseEnter(dato: Date) {
		if (this.state.fra && !this.state.til) {
			this.setState({ hoverTil: moment.utc(dato, moment.HTML5_FMT.DATE).format('YYYY-DD-MM') });
		}
	}

	onDayFocus(
		dato: string,
		modifiers: DayModifiers,
		evt: React.KeyboardEvent<HTMLDivElement>
	) {
		if (this.state.fra) {
			this.setState({
				hoverTil: dato
			});
		}
	}

	toggleKalender(start?: string) {
		const { startdato, sluttdato } = this.props;
		this.setFokusPåKalenderKnapp = true;
		this.setState({
			erÅpen: !this.state.erÅpen,
			inputTarget: 'fra',
			fra: start || startdato,
			til: sluttdato
		});
	}

	lukkKalender(settFokusPåKalenderknapp?: boolean) {
		this.setState({ erÅpen: false });
		this.setFokusPåKalenderKnapp = settFokusPåKalenderknapp;
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (!prevState.erÅpen && this.state.erÅpen && this.kalender) {
			this.kalender.settFokus();
		} else if (
			prevState.erÅpen &&
			!this.state.erÅpen &&
			this.setFokusPåKalenderKnapp &&
			this.sluttKalenderKnapp
		) {
			this.setFokusPåKalenderKnapp = false;
			this.sluttKalenderKnapp.focus();
		}
	}

	getSelectedDays(): Modifier[]{
		const { fra, til } = this.state;
		if (fra && til) {
			return [
				moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
				{
					from: moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
					to: moment.utc(til, moment.HTML5_FMT.DATE).toDate(),
				} as RangeModifier
			];
		} else if (fra && !til && this.state.hoverTil) {
			return [
				moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
				{
					from: moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
					to: moment.utc(this.state.hoverTil, moment.HTML5_FMT.DATE).toDate()
				} as RangeModifier
			];
		}
		return [];
	}

	render() {
		const {
			startdato,
			sluttdato,
			kalender,
			avgrensninger,
			locale = 'nb',
			disabled,
			kanVelgeUgyldigDato = false,
			startInputProps,
			sluttInputProps,
			...kalenderProps
		} = this.props;

		const { erÅpen, fra, til, hoverTil, inputTarget } = this.state;

		let mod;
		if ((fra && til) || hoverTil) {
			mod = {
				start: moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
				end: moment.utc(til, moment.HTML5_FMT.DATE).toDate() || moment.utc(hoverTil, moment.HTML5_FMT.DATE).toDate()
			};
		}
		const dayPickerProps = {
			...this.props.dayPickerProps,
			modifiers: mod,
			onDayMouseEnter: this.onMouseEnter,
			selectedDays: this.getSelectedDays(),
			numberOfMonths: 1,
			onDayFocus: this.onDayFocus,
			className: 'DayPicker--range'
		};

		return (
			<div className="nav-datovelger">
				<div className="nav-datovelger__periode">
					<div className="nav-datovelger__periode__startInput">
						<div className="nav-datovelger__inputContainer">
							<Datoinput
								inputProps={{
									...trimInputProps(this.props.id, 'start', startInputProps)
								}}
								ref={(c) => (this.startInput = c)}
								valgtDato={fra && fra ||startdato && startdato}
								onDateChange={(d: string) => this.onStartdateChange(d)}
								onInputChange={this.onStartInputChange}
								isDatePickerTarget={erÅpen && inputTarget === 'fra'}
								disabled={disabled}
							/>
							<KalenderKnapp
								ref={(c) => (this.startKalenderKnapp = c)}
								onClick={this.toggleKalender}
								erÅpen={erÅpen || false}
								disabled={disabled}
							/>
						</div>
					</div>
					<div className="nav-datovelger__periode__sluttInput">
						<div className="nav-datovelger__inputContainer">
							<Datoinput
								inputProps={{
									...trimInputProps(this.props.id, 'slutt', sluttInputProps),
									'aria-label': 'Til dato'
								}}
								ref={(c) => (this.sluttInput = c)}
								valgtDato={til && til || sluttdato && sluttdato}
								onDateChange={(d: string) => this.onSluttdateChange(d)}
								onInputChange={this.onSluttInputChange}
								isDatePickerTarget={erÅpen && inputTarget === 'til'}
								disabled={disabled}
							/>
							<KalenderKnapp
								ref={(c) => (this.sluttKalenderKnapp = c)}
								onClick={() => this.toggleKalender(startdato)}
								erÅpen={erÅpen || false}
								disabled={disabled}
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
								onVelgDag={(d: string) => this.onVelgDato(d, true)}
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
