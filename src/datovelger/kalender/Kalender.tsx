import * as React from 'react';
import DayPicker, {
	DayPickerProps,
	Modifier,
	DayModifiers
} from 'react-day-picker';
import * as moment from 'moment';
import * as FocusTrap from 'focus-trap-react';
import {
	fokuserPåDato,
	getFokusertDato,
	getSammeDatoIMåned,
	erMånedTilgjengelig,
	fokuserKalender,
	isDateObject
} from '../utils';
import Navbar from './Navbar';
import { TittelOgNavigasjon } from './TittelOgNavigasjon';
import kalenderLocaleUtils from './localeUtils';
import { LocaleUtils } from 'react-day-picker/types/utils';

export interface Props {
	måned: Date;
	dato?: Date | Date[];
	locale: string;
	min?: Date;
	maks?: Date;
	localeUtils?: LocaleUtils;
	onVelgDag: (dato: Date) => void;
	onLukk: () => void;
	utilgjengeligeDager?: Modifier[];
	visUkenumre?: boolean;
	kanVelgeUgyldigDato?: boolean;
	dayPickerProps?: DayPickerProps;
}

export interface State {
	måned: Date;
}

export class Kalender extends React.Component<Props, State> {
	kalender: HTMLDivElement | null;
	nesteFokusertDato: Date | undefined;
	setFokusPåInput: boolean | undefined;

	constructor(props: Props) {
		super(props);
		this.navigerMåneder = this.navigerMåneder.bind(this);
		this.settFokus = this.settFokus.bind(this);
		this.onByttDag = this.onByttDag.bind(this);
		this.onByttMåned = this.onByttMåned.bind(this);
		this.state = {
			måned: props.måned
		};
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (
			prevState.måned !== this.state.måned &&
			this.kalender &&
			this.nesteFokusertDato
		) {
			fokuserPåDato(this.kalender, this.nesteFokusertDato);
			this.nesteFokusertDato = undefined;
		}
	}

	settFokus() {
		if (this.kalender) {
			fokuserKalender(this.kalender);
		}
	}

	onByttDag(dato: Date, modifiers: DayModifiers) {
		if (this.props.kanVelgeUgyldigDato || !modifiers.disabled) {
			this.props.onVelgDag(dato);
		}
	}

	onByttMåned(måned: Date) {
		const fokusertDato = getFokusertDato(this.kalender);
		this.nesteFokusertDato = fokusertDato
			? getSammeDatoIMåned(fokusertDato, this.state.måned, måned)
			: undefined;
		this.setState({
			måned
		});
	}

	navigerMåneder(evt: React.KeyboardEvent<any>, antall: number) {
		evt.preventDefault();
		const mnd = moment(this.state.måned)
			.add(antall, 'month')
			.toDate();
		if (
			erMånedTilgjengelig(mnd, { min: this.props.min, maks: this.props.maks })
		) {
			this.onByttMåned(mnd);
		}
	}

	render() {
		const {
			dato,
			min,
			maks,
			locale,
			visUkenumre,
			utilgjengeligeDager,
			dayPickerProps
		} = this.props;
		const { måned } = this.state;

		const localeUtils = {
			...kalenderLocaleUtils,
			...this.props.localeUtils
		};

		const innstillinger: DayPickerProps = {
			locale,
			localeUtils,
			navbarElement: <span />,
			captionElement: (
				<TittelOgNavigasjon
					date={måned}
					locale={locale}
					localeUtils={localeUtils}
					navbar={
						<Navbar
							måned={måned}
							byttMåned={(d: Date) => this.onByttMåned(d)}
							min={min}
							maks={maks}
						/>
					}
				/>
			),
			firstDayOfWeek: 1,
			showWeekNumbers: visUkenumre
		};

		return (
			<div
				ref={(c) => (this.kalender = c)}
				role="dialog"
				aria-label="Kalender"
				className="nav-datovelger__kalender">
				<FocusTrap
					active={true}
					focusTrapOptions={{
						clickOutsideDeactivates: true,
						onDeactivate: this.props.onLukk
					}}>
					<DayPicker
						locale={locale}
						localeUtils={localeUtils}
						fromMonth={min}
						toMonth={maks}
						month={måned}
						canChangeMonth={false}
						selectedDays={isDateObject(dato) ? dato : undefined}
						onDayClick={this.onByttDag}
						onMonthChange={this.onByttMåned}
						disabledDays={utilgjengeligeDager}
						{...innstillinger}
						{...dayPickerProps}
					/>
				</FocusTrap>
			</div>
		);
	}
}
export default Kalender;
