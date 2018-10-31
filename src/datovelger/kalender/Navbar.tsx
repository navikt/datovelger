import * as React from 'react';
import * as moment from 'moment';
import * as classnames from 'classnames';
import Chevron from '../elementer/ChevronSvg';
import { Tekster } from '../tekster';
import { LocaleUtils } from 'react-day-picker/types/utils';
import YearSelector from './YearSelector';

export interface Props {
	defaultMåned: Date;
	byttMåned: (month: Date) => void;
	byttÅr?: (month: Date) => void;
	min?: Date;
	maks?: Date;
	visÅrVelger?: boolean;
	locale: string;
	localeUtils: LocaleUtils;
}

export interface NavbarKnappProps {
	måned: Date;
	retning: 'forrige' | 'neste';
	disabled: boolean;
	onClick: (evt: React.MouseEvent<HTMLButtonElement>, måned: Date) => void;
}

const NavbarKnapp: React.StatelessComponent<NavbarKnappProps> = ({
	måned,
	retning,
	disabled,
	onClick
}) => {
	const label =
		retning === 'forrige'
			? Tekster.navbar_forrigeManed_label
			: Tekster.navbar_forrigeManed_label;

	return (
		<button
			className={classnames(
				'nav-datovelger__navbar__knapp',
				`nav-datovelger__navbar__knapp--${retning}`,
				{
					'nav-datovelger__navbar__knapp--disabled': disabled
				}
			)}
			type="button"
			onClick={(e) => (disabled ? null : onClick(e, måned))}
			aria-label={label}
			aria-disabled={disabled}
			role="button">
			<Chevron retning={retning === 'forrige' ? 'venstre' : 'høyre'} />
		</button>
	);
};

const lagCaption = (props: Props) =>
	props.localeUtils.formatMonthTitle(props.defaultMåned, props.locale);

class Navbar extends React.Component<Props> {
	shouldComponentUpdate(nextProps: any) {
		return lagCaption(nextProps) !== lagCaption(this.props);
	}

	render() {
		const {
			defaultMåned,
			byttMåned,
			min,
			maks,
			visÅrVelger,
			locale,
			localeUtils
		} = this.props;

		const forrigeMåned = moment(defaultMåned).add(-1, 'months');
		const nesteMåned = moment(defaultMåned).add(1, 'months');

		const forrigeErDisabled = min
			? moment(min).isAfter(forrigeMåned.endOf('month'))
			: false;

		const nesteErDisabled = maks
			? moment(maks).isBefore(nesteMåned.startOf('month'))
			: false;

		const onClick = (evt: React.MouseEvent<HTMLButtonElement>, mnd: Date) => {
			evt.preventDefault();
			evt.stopPropagation();
			byttMåned(mnd);
		};

		return (
			<div className="DayPicker-Caption">
				<span aria-live="assertive" className={visÅrVelger ? 'sr-only' : ''}>
					{lagCaption(this.props)}
				</span>
				{visÅrVelger && (
					<div className="nav-datovelger__navbar__yearSelector">
						<YearSelector
							defaultMonth={defaultMåned}
							max={maks}
							min={min}
							locale={locale}
							localeUtils={localeUtils}
							onChange={(mnd: Date) => byttMåned(mnd)}
						/>
					</div>
				)}
				<div
					className={`nav-datovelger__navbar ${
						visÅrVelger ? 'nav-datovelger__navbar--withYearSelector' : ''
					}`}
					role="nav">
					<NavbarKnapp
						måned={forrigeMåned.toDate()}
						retning="forrige"
						disabled={forrigeErDisabled}
						onClick={onClick}
					/>
					<NavbarKnapp
						måned={nesteMåned.toDate()}
						retning="neste"
						disabled={nesteErDisabled}
						onClick={onClick}
					/>
				</div>
			</div>
		);
	}
}

export default Navbar;
