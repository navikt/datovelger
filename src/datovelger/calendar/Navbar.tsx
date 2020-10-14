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
    onChangeMonth: (month: Date, focusElement: NavigationFocusElement) => void;
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
    onClick: (evt: any, måned: Date, focusElement: NavigationFocusElement) => void;
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

const createCaption = (props: Props) => props.localeUtils.formatMonthTitle(props.defaultMonth, props.locale);

class Navbar extends React.Component<Props> {
    shouldComponentUpdate(nextProps: any) {
        return createCaption(nextProps) !== createCaption(this.props);
    }

    render() {
        const { defaultMonth, onChangeMonth, minDate, maxDate, showYearSelector, locale, localeUtils } = this.props;

        const previousMonth = moment(defaultMonth).add(-1, 'months');
        const nextMonth = moment(defaultMonth).add(1, 'months');

        const lastMonthIsDisabled = minDate ? moment(minDate).isAfter(previousMonth.endOf('month')) : false;
        const nextMonthIsDisabled = maxDate ? moment(maxDate).isBefore(nextMonth.startOf('month')) : false;

        const onClick = (
            evt: React.MouseEvent<HTMLButtonElement>,
            month: Date,
            focusElement: NavigationFocusElement
        ) => {
            evt.preventDefault();
            evt.stopPropagation();
            onChangeMonth(month, focusElement);
        };

        return (
            <div className="DayPicker-Caption">
                <span aria-live="assertive" className={showYearSelector ? 'sr-only' : ''}>
                    {createCaption(this.props)}
                </span>
                {showYearSelector && (
                    <div className="nav-datovelger__navbar__yearSelector">
                        <YearSelector
                            defaultMonth={defaultMonth}
                            maxDate={maxDate}
                            minDate={minDate}
                            locale={locale}
                            localeUtils={localeUtils}
                            onChange={(month, focusElement) => onChangeMonth(month, focusElement)}
                        />
                    </div>
                )}
                <nav
                    className={`nav-datovelger__navbar ${
                        showYearSelector ? 'nav-datovelger__navbar--withYearSelector' : ''
                    }`}>
                    <NavbarButton
                        month={previousMonth.toDate()}
                        direction={'previousMonth'}
                        disabled={lastMonthIsDisabled}
                        onClick={(evt, month) => onClick(evt, month, 'previousMonth')}
                    />
                    <NavbarButton
                        month={nextMonth.toDate()}
                        direction={'nextMonth'}
                        disabled={nextMonthIsDisabled}
                        onClick={(evt, month) => onClick(evt, month, 'nextMonth')}
                    />
                </nav>
            </div>
        );
    }
}

export default Navbar;
