import FocusTrap from 'focus-trap-react';
import React, { useState, MutableRefObject } from 'react';
import DayPicker, { DayModifiers, DayPickerProps, Modifier } from 'react-day-picker';
import { LocaleUtils } from 'react-day-picker/types/utils';
import { fokuserPåMåned } from '../utils';
import kalenderLocaleUtils from './localeUtils';
import Navbar from './Navbar';
import { ISODateString } from '../types';
import { dateToISODateString, ISODateStringToUTCDate } from '../utils/dateFormatUtils';

export interface Props {
    måned: Date;
    dato?: ISODateString;
    min?: ISODateString;
    maks?: ISODateString;
    locale: string;
    localeUtils?: LocaleUtils;
    onVelgDag: (dato: ISODateString) => void;
    onLukk: () => void;
    utilgjengeligeDager?: Modifier[];
    visUkenumre?: boolean;
    kanVelgeUgyldigDato?: boolean;
    visÅrVelger?: boolean;
    dayPickerProps?: DayPickerProps;
}

export type NavFocusElement = 'neste' | 'forrige' | 'aar' | 'mnd';

const Kalender = React.forwardRef(function Calendar(props: Props, ref: React.Ref<HTMLDivElement>) {
    const [displayMonth, setDisplayMonth] = useState<Date>(props.måned);

    const {
        dato,
        min,
        maks,
        locale = 'nb',
        localeUtils,
        visUkenumre,
        utilgjengeligeDager,
        visÅrVelger,
        kanVelgeUgyldigDato,
        onLukk,
        onVelgDag,
        dayPickerProps,
    } = props;

    const onSelectDate = (dato: Date, modifiers: DayModifiers) => {
        if (kanVelgeUgyldigDato || !modifiers.disabled) {
            onVelgDag(dateToISODateString(dato));
        }
    };

    const onChangeMonth = (month: Date, navFocusElement?: NavFocusElement) => {
        setDisplayMonth(month);
        if (ref) {
            const calendar = (ref as MutableRefObject<HTMLElement>).current;
            if (navFocusElement) {
                setTimeout(() => {
                    fokuserPåMåned(calendar, navFocusElement);
                });
            }
        }
    };

    const innstillinger: DayPickerProps = {
        locale,
        localeUtils,
        navbarElement: function navbarElement() {
            return <span />;
        },
        captionElement: function CaptionElement() {
            const minDate = ISODateStringToUTCDate(min);
            const maxDate = ISODateStringToUTCDate(maks);
            return (
                <Navbar
                    defaultMåned={displayMonth}
                    byttMåned={onChangeMonth}
                    min={minDate}
                    maks={maxDate}
                    locale={locale}
                    localeUtils={{
                        ...kalenderLocaleUtils,
                        ...localeUtils,
                    }}
                    visÅrVelger={visÅrVelger}
                />
            );
        },
        firstDayOfWeek: 1,
        showWeekNumbers: visUkenumre,
    };

    return (
        <div ref={ref} role="dialog" aria-label="Kalender" className="nav-datovelger__kalender">
            <FocusTrap
                active={true}
                focusTrapOptions={{
                    clickOutsideDeactivates: true,
                    onDeactivate: onLukk,
                }}>
                <DayPicker
                    locale={locale}
                    localeUtils={localeUtils}
                    fromMonth={min ? ISODateStringToUTCDate(min) : undefined}
                    toMonth={maks ? ISODateStringToUTCDate(maks) : undefined}
                    month={displayMonth}
                    canChangeMonth={false}
                    selectedDays={dato ? ISODateStringToUTCDate(dato) : undefined}
                    onDayClick={onSelectDate}
                    onMonthChange={onChangeMonth}
                    disabledDays={utilgjengeligeDager}
                    {...innstillinger}
                    {...dayPickerProps}
                />
            </FocusTrap>
        </div>
    );
});
export default Kalender;
