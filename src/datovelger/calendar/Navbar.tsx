import React from 'react';
import { LocaleUtils } from 'react-day-picker';
import classnames from 'classnames';
import moment from 'moment';
import Chevron from '../elementer/ChevronSvg';
import { Texts } from '../texts';
import { NavigationFocusElement } from './Calendar';
import YearSelector from './YearSelector';

type Direction = 'previousMonth' | 'nextMonth';

interface Props {
    defaultMonth: Date;
    onChangeMonth: (month: Date, fokusElement: NavigationFocusElement) => void;
    onChangeYear?: (month: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    showYearSelector?: boolean;
    locale: string;
    localeUtils: LocaleUtils;
}

interface NavbarButtonProps {
    month: Date;
    direction: Direction;
    disabled: boolean;
    onClick: (evt: any, måned: Date, fokusElement: NavigationFocusElement) => void;
}

class NavbarButton extends React.Component<NavbarButtonProps> {
    render() {
        const { month, direction, disabled, onClick } = this.props;
        const label = direction === 'previousMonth' ? Texts.navbarPreviousMonthLabel : Texts.navBarNextMonthLabel;

        return (
            <button
                type="button"
                id={`kalender-navbarknapp-${direction}`}
                className={classnames('nav-datovelger__navbar__knapp', `nav-datovelger__navbar__knapp--${direction}`, {
                    'nav-datovelger__navbar__knapp--disabled': disabled,
                })}
                onClick={(e) => (disabled ? null : onClick(e, month, direction))}
                aria-label={label}
                aria-disabled={disabled}>
                <Chevron direction={direction === 'previousMonth' ? 'venstre' : 'høyre'} />
            </button>
        );
    }
}

const lagCaption = (props: Props) => props.localeUtils.formatMonthTitle(props.defaultMonth, props.locale);

class Navbar extends React.Component<Props> {
    shouldComponentUpdate(nextProps: any) {
        return lagCaption(nextProps) !== lagCaption(this.props);
    }

    render() {
        const { defaultMonth, onChangeMonth, minDate, maxDate, showYearSelector, locale, localeUtils } = this.props;

        const previousMonth = moment(defaultMonth).add(-1, 'months');
        const nextMonth = moment(defaultMonth).add(1, 'months');

        const lastMonthIsDisabled = minDate ? moment(minDate).isAfter(previousMonth.endOf('month')) : false;
        const nextMonthIsDisabled = maxDate ? moment(maxDate).isBefore(nextMonth.startOf('month')) : false;

        const onClick = (evt: React.MouseEvent<HTMLButtonElement>, mnd: Date, fokusElement: NavigationFocusElement) => {
            evt.preventDefault();
            evt.stopPropagation();
            onChangeMonth(mnd, fokusElement);
        };

        return (
            <div className="DayPicker-Caption">
                <span aria-live="assertive" className={showYearSelector ? 'sr-only' : ''}>
                    {lagCaption(this.props)}
                </span>
                {showYearSelector && (
                    <div className="nav-datovelger__navbar__yearSelector">
                        <YearSelector
                            defaultMonth={defaultMonth}
                            maxDate={maxDate}
                            minDate={minDate}
                            locale={locale}
                            localeUtils={localeUtils}
                            onChange={(mnd, fokusElement) => onChangeMonth(mnd, fokusElement)}
                        />
                    </div>
                )}
                <div
                    role="navigation"
                    className={`nav-datovelger__navbar ${
                        showYearSelector ? 'nav-datovelger__navbar--withYearSelector' : ''
                    }`}>
                    <NavbarButton
                        month={previousMonth.toDate()}
                        direction={'previousMonth'}
                        disabled={lastMonthIsDisabled}
                        onClick={(evt, mnd) => onClick(evt, mnd, 'previousMonth')}
                    />
                    <NavbarButton
                        month={nextMonth.toDate()}
                        direction={'nextMonth'}
                        disabled={nextMonthIsDisabled}
                        onClick={(evt, mnd) => onClick(evt, mnd, 'nextMonth')}
                    />
                </div>
            </div>
        );
    }
}

export default Navbar;
