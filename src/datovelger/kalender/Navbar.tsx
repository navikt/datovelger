import React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
import classnames from 'classnames';
import moment from 'moment';
import Chevron from '../elementer/ChevronSvg';
import { Tekster } from '../tekster';
import { MånedFokusElement } from './Kalender';
import YearSelector from './YearSelector';

export interface Props {
    defaultMåned: Date;
    byttMåned: (month: Date, fokusElement: MånedFokusElement) => void;
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
    onClick: (evt: any, måned: Date, fokusElement: MånedFokusElement) => void;
}

class NavbarKnapp extends React.Component<NavbarKnappProps> {
    render() {
        const { måned, retning, disabled, onClick } = this.props;
        const label = retning === 'forrige' ? Tekster.navbar_forrigeManed_label : Tekster.navbar_nesteManed_label;

        return (
            <button
                id={`kalender-navbarknapp-${retning}`}
                className={classnames('nav-datovelger__navbar__knapp', `nav-datovelger__navbar__knapp--${retning}`, {
                    'nav-datovelger__navbar__knapp--disabled': disabled
                })}
                onClick={(e) => (disabled ? null : onClick(e, måned, retning))}
                aria-label={label}
                aria-disabled={disabled}>
                <Chevron retning={retning === 'forrige' ? 'venstre' : 'høyre'} />
            </button>
        );
    }
}

const lagCaption = (props: Props) => props.localeUtils.formatMonthTitle(props.defaultMåned, props.locale);

class Navbar extends React.Component<Props> {
    shouldComponentUpdate(nextProps: any) {
        return lagCaption(nextProps) !== lagCaption(this.props);
    }

    render() {
        const { defaultMåned, byttMåned, min, maks, visÅrVelger, locale, localeUtils } = this.props;

        const forrigeMåned = moment(defaultMåned).add(-1, 'months');
        const nesteMåned = moment(defaultMåned).add(1, 'months');

        const forrigeErDisabled = min ? moment(min).isAfter(forrigeMåned.endOf('month')) : false;

        const nesteErDisabled = maks ? moment(maks).isBefore(nesteMåned.startOf('month')) : false;

        const onClick = (evt: React.MouseEvent<HTMLButtonElement>, mnd: Date, fokusElement: MånedFokusElement) => {
            evt.preventDefault();
            evt.stopPropagation();
            byttMåned(mnd, fokusElement);
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
                            onChange={(mnd, fokusElement) => byttMåned(mnd, fokusElement)}
                        />
                    </div>
                )}
                <div
                    role="navigation"
                    className={`nav-datovelger__navbar ${
                        visÅrVelger ? 'nav-datovelger__navbar--withYearSelector' : ''
                    }`}>
                    <NavbarKnapp
                        måned={forrigeMåned.toDate()}
                        retning="forrige"
                        disabled={forrigeErDisabled}
                        onClick={(evt, mnd) => onClick(evt, mnd, 'forrige')}
                    />
                    <NavbarKnapp
                        måned={nesteMåned.toDate()}
                        retning="neste"
                        disabled={nesteErDisabled}
                        onClick={(evt, mnd) => onClick(evt, mnd, 'neste')}
                    />
                </div>
            </div>
        );
    }
}

export default Navbar;
