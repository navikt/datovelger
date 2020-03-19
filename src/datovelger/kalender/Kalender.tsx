import FocusTrap from 'focus-trap-react';
import React from 'react';
import DayPicker, {
    CaptionElementProps, DayModifiers, DayPickerProps, Modifier, NavbarElementProps
} from 'react-day-picker';
import { LocaleUtils } from 'react-day-picker/types/utils';
import moment from 'moment';
import {
    fokuserKalender, fokuserPåDato, fokuserPåMåned, getFokusertDato, getSammeDatoIMåned
} from '../utils';
import kalenderLocaleUtils from './localeUtils';
import Navbar from './Navbar';

export interface Props {
    måned: Date;
    dato?: string;
    locale: string;
    min?: string;
    maks?: string;
    localeUtils?: LocaleUtils;
    onVelgDag: (dato: string) => void;
    onLukk: () => void;
    utilgjengeligeDager?: Modifier[];
    visUkenumre?: boolean;
    kanVelgeUgyldigDato?: boolean;
    visÅrVelger?: boolean;
    dayPickerProps?: DayPickerProps;
}

export interface State {
    måned: Date;
}

export type MånedFokusElement = 'neste' | 'forrige' | 'aar' | 'mnd';

export class Kalender extends React.Component<Props, State> {
    kalender: HTMLDivElement | null = null;
    nesteFokusertDato: Date | undefined;
    setFokusPåInput: boolean | undefined;
    månedFokusElement?: MånedFokusElement;

    constructor(props: Props) {
        super(props);
        this.settFokus = this.settFokus.bind(this);
        this.onByttDag = this.onByttDag.bind(this);
        this.onByttMåned = this.onByttMåned.bind(this);
        this.state = {
            måned: props.måned
        };
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.måned !== this.state.måned && this.kalender && this.nesteFokusertDato) {
            fokuserPåDato(this.kalender, this.nesteFokusertDato);
            this.nesteFokusertDato = undefined;
        } else if (prevState.måned !== this.state.måned && this.kalender && this.månedFokusElement) {
            fokuserPåMåned(this.kalender, this.månedFokusElement);
            this.månedFokusElement = undefined;
        }
    }

    settFokus() {
        if (this.kalender) {
            fokuserKalender(this.kalender);
        }
    }

    onByttDag(dato: Date, modifiers: DayModifiers) {
        if (this.props.kanVelgeUgyldigDato || !modifiers.disabled) {
            this.props.onVelgDag(moment.utc(dato).format('YYYY-MM-DD'));
        }
    }

    onByttMåned(måned: Date, månedFokusElement?: MånedFokusElement) {
        const fokusertDato = getFokusertDato(this.kalender);
        this.nesteFokusertDato = fokusertDato ? getSammeDatoIMåned(fokusertDato, this.state.måned, måned) : undefined;
        this.månedFokusElement = månedFokusElement;
        this.setState({
            måned
        });
    }

    render() {
        const { dato, min, maks, locale, visUkenumre, utilgjengeligeDager, visÅrVelger, dayPickerProps } = this.props;
        const { måned } = this.state;

        const localeUtils = {
            ...kalenderLocaleUtils,
            ...this.props.localeUtils
        };

        const innstillinger: DayPickerProps = {
            locale,
            localeUtils,
            navbarElement: (props: NavbarElementProps) => <span />,
            captionElement: (props: CaptionElementProps) => (
                <Navbar
                    defaultMåned={måned}
                    byttMåned={(d: Date, elementId) => this.onByttMåned(d, elementId)}
                    min={min ? moment.utc(min, moment.HTML5_FMT.DATE, true).toDate() : undefined}
                    maks={maks ? moment.utc(maks, moment.HTML5_FMT.DATE, true).toDate() : undefined}
                    locale={locale}
                    localeUtils={localeUtils}
                    visÅrVelger={visÅrVelger}
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
                        fromMonth={min ? moment(min, moment.HTML5_FMT.DATE, true).toDate() : undefined}
                        toMonth={maks ? moment(maks, moment.HTML5_FMT.DATE, true).toDate() : undefined}
                        month={måned}
                        canChangeMonth={false}
                        selectedDays={dato ? moment(dato, moment.HTML5_FMT.DATE, true).toDate() : undefined}
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
