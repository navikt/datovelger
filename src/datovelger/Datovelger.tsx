import * as React from 'react';
import * as classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import { Avgrensninger, KalenderPlassering } from './types';
import { getDefaultMåned, getUtilgjengeligeDager } from './utils';
import { validerDato, DatoValidering } from './utils/datovalidering';
import { DayPickerProps } from 'react-day-picker';
import KalenderKnapp from './elementer/KalenderKnapp';
import DomEventContainer from './common/DomEventContainer';
import Datoinput from './Datoinput';
import AvgrensningerInfo from './elementer/AvgrensningerInfo';
import Kalender from './kalender/Kalender';
import KalenderPortal from './elementer/KalenderPortal';

export { Avgrensninger, Tidsperiode } from './types';

export interface State {
	måned: Date;
	datovalidering: DatoValidering;
	erÅpen?: boolean;
	inputValue: string;
}

export interface DateInputProps {
	id: string;
	placeholder?: string;
	required?: boolean;
	ariaDescribedby?: string;
	onChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DatovelgerCommonProps {
	kalender?: {
		/** Om ukenumre skal vises - default false */
		visUkenumre?: boolean;
		/** Hvor kalender skal vises. Default under */
		plassering?: KalenderPlassering;
	};
	/** Begrensninger på hvilke datoer bruker kan velge */
	avgrensninger?: Avgrensninger;
	/** Default false. Tillater bruker å velge ugyldig dato. */
	kanVelgeUgyldigDato?: boolean;
	/** dayPickerProps */
	dayPickerProps?: DayPickerProps;
	/** Språk */
	locale?: string;
	/** Datovelger er låst */
	disabled?: boolean;
}

export interface Props extends DatovelgerCommonProps {
	/** Props for tekstinput feltet */
	input: DateInputProps;
	/** Valgt dato */
	dato?: Date;
	/** Kalles når en dato velges */
	onChange: (date: Date, validering?: DatoValidering) => void;
}

class Datovelger extends React.Component<Props, State> {
	instansId: string;
	input: Datoinput | null;
	setFokusPåKalenderKnapp: boolean | undefined;
	kalender: Kalender | null;
	kalenderKnapp: KalenderKnapp | null;

	constructor(props: Props) {
		super(props);

		this.instansId = guid();

		this.onVelgDag = this.onVelgDag.bind(this);
		this.onDatoDateChange = this.onDatoDateChange.bind(this);
		this.toggleKalender = this.toggleKalender.bind(this);
		this.lukkKalender = this.lukkKalender.bind(this);
		this.onDateInputChange = this.onDateInputChange.bind(this);

		this.state = {
			måned: getDefaultMåned(props.dato, props.avgrensninger),
			datovalidering: props.dato
				? validerDato(props.dato, props.avgrensninger || {})
				: 'datoErIkkeDefinert',
			erÅpen: false,
			inputValue: ''
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		this.setState({
			datovalidering: validerDato(
				nextProps.dato,
				nextProps.avgrensninger || {}
			),
			måned: getDefaultMåned(nextProps.dato, nextProps.avgrensninger)
		});
	}

	onVelgDag(dato: Date, lukkKalender?: boolean) {
		const datovalidering = validerDato(dato, this.props.avgrensninger || {});
		this.setState({
			erÅpen: false,
			datovalidering
		});
		this.props.onChange(dato);
		if (lukkKalender) {
			this.lukkKalender(true);
		}
	}

	onDatoDateChange(dato: Date) {
		const datovalidering = validerDato(dato, this.props.avgrensninger || {});
		this.setState({
			erÅpen: false,
			datovalidering
		});
		this.props.onChange(dato);
	}

	onDateInputChange(value: string, event: React.ChangeEvent<HTMLInputElement>) {
		const { avgrensninger, input } = this.props;
		const dato = event.target.value;
		const datovalidering = validerDato(dato, avgrensninger || {});
		this.setState({
			erÅpen: false,
			datovalidering,
			inputValue: dato
		});
		if (input.onChange) {
			input.onChange(value, event);
		}
	}

	toggleKalender() {
		this.setFokusPåKalenderKnapp = true;
		this.setState({ erÅpen: !this.state.erÅpen });
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
			this.kalenderKnapp
		) {
			this.setFokusPåKalenderKnapp = false;
			this.kalenderKnapp.focus();
		}
	}

	render() {
		const {
			dato,
			input,
			kalender,
			avgrensninger,
			locale = 'nb',
			disabled,
			kanVelgeUgyldigDato = false,
			...kalenderProps
		} = this.props;

		const { erÅpen, datovalidering } = this.state;
		const avgrensningerInfoId = avgrensninger
			? `${this.instansId}_srDesc`
			: undefined;
		const invalidDate =
			datovalidering !== 'gyldig' && this.state.inputValue !== '';

		// Fjern onChange fra input props
		const { onChange, ...restOfInputProps } = input;
		const dateInputProps = {
			...restOfInputProps,
			'aria-invalid': invalidDate,
			'aria-describedby': avgrensningerInfoId
		};

		return (
			<DomEventContainer>
				<div className={classnames('nav-datovelger')}>
					{avgrensninger &&
						avgrensningerInfoId && (
							<AvgrensningerInfo
								id={avgrensningerInfoId}
								avgrensninger={avgrensninger}
							/>
						)}
					<div className="nav-datovelger__inputContainer">
						<Datoinput
							inputProps={dateInputProps}
							ref={(c) => (this.input = c)}
							date={dato}
							onDateChange={this.onDatoDateChange}
							onInputChange={this.onDateInputChange}
							disabled={disabled}
						/>
						<KalenderKnapp
							disabled={disabled}
							ref={(c) => (this.kalenderKnapp = c)}
							onClick={this.toggleKalender}
							erÅpen={erÅpen || false}
						/>
					</div>
					{erÅpen && (
						<KalenderPortal plassering={kalender && kalender.plassering}>
							<Kalender
								ref={(c) => (this.kalender = c)}
								{...kalenderProps}
								locale={locale}
								dato={dato}
								måned={this.state.måned}
								min={avgrensninger && avgrensninger.minDato}
								maks={avgrensninger && avgrensninger.maksDato}
								utilgjengeligeDager={
									avgrensninger
										? getUtilgjengeligeDager(avgrensninger)
										: undefined
								}
								onVelgDag={(d) => this.onVelgDag(d, true)}
								onLukk={() => this.lukkKalender(true)}
								kanVelgeUgyldigDato={kanVelgeUgyldigDato}
								dayPickerProps={this.props.dayPickerProps}
							/>
						</KalenderPortal>
					)}
				</div>
			</DomEventContainer>
		);
	}
}

export default Datovelger;
