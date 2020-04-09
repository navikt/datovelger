import React, { Ref, useEffect, useRef, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import DomEventContainer from './common/DomEventContainer';
import bemUtils from '../dev/utils/bemUtils';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import KalenderPortal from './elementer/KalenderPortal';
import Kalender from './kalender/Kalender';
import { DatovelgerAvgrensninger, ISODateString, KalenderPlassering } from './types';
import { getDefaultMåned, getUtilgjengeligeDager } from './utils';
import { erDatoGyldig } from './utils/datovalidering';

export interface DateInputProps {
    id: string;
    name: string;
    ariaLabel?: string;
    placeholder?: string;
    ariaDescribedby?: string;
}

export interface DatovelgerCommonProps {
    id: string;
    kalender?: {
        visUkenumre?: boolean;
        plassering?: KalenderPlassering;
    };
    avgrensninger?: DatovelgerAvgrensninger;
    kanVelgeUgyldigDato?: boolean;
    dayPickerProps?: DayPickerProps;
    locale?: string;
    disabled?: boolean;
}

export interface DatovelgerProps extends DatovelgerCommonProps {
    input: DateInputProps;
    valgtDato?: ISODateString;
    visÅrVelger?: boolean;
    onChange: (date?: ISODateString) => void;
}

const bem = bemUtils('nav-datovelger');

const Datovelger = ({
    id,
    avgrensninger,
    valgtDato,
    dayPickerProps,
    input,
    kalender,
    locale = 'nb',
    disabled,
    visÅrVelger,
    kanVelgeUgyldigDato,
    onChange,
    ...kalenderProps
}: DatovelgerProps) => {
    const [dateIsValid, setDateIsValid] = useState<boolean>(erDatoGyldig(valgtDato));
    const [activeMonth, setActiveMonth] = useState<Date>(getDefaultMåned(valgtDato, avgrensninger, dayPickerProps));
    const [calendarIsVisible, setCalendarIsVisible] = useState<boolean>(false);

    const dateInput = useRef(null);
    const calendarButton: Ref<KalenderKnapp> = useRef(null);
    const calendar = useRef(null);

    useEffect(() => {
        setDateIsValid(erDatoGyldig(valgtDato, avgrensninger));
        setActiveMonth(getDefaultMåned(valgtDato, avgrensninger, dayPickerProps));
    }, [valgtDato, avgrensninger, dayPickerProps]);

    const { ariaDescribedby, ariaLabel, ...restOfInputProps } = input;

    const dateInputProps = {
        name: input && input.name ? input.name : `${id}__input`,
        'aria-invalid': dateIsValid,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        ...restOfInputProps,
    };

    const toggleCalendarVisibility = () => {
        setCalendarIsVisible(!calendarIsVisible);
        calendarButton.current?.focus();
    };

    const setDateFromInput = (date?: ISODateString) => {
        setCalendarIsVisible(false);
        setDateIsValid(erDatoGyldig(date, avgrensninger));
        onChange(date);
    };

    const setDateFromCalendar = (dateString: ISODateString, closeCalender?: boolean) => {
        setDateIsValid(erDatoGyldig(dateString, avgrensninger));
        setCalendarIsVisible(false);
        onChange(dateString);
        if (closeCalender) {
            setCalendarIsVisible(false);
        }
    };

    return (
        <DomEventContainer>
            <div className={bem.block}>
                <div className={bem.element('inputContainer')}>
                    <Datoinput
                        inputProps={dateInputProps}
                        ref={dateInput}
                        valgtDato={valgtDato || ''}
                        onDateChange={setDateFromInput}
                        disabled={disabled}
                    />
                    <KalenderKnapp
                        disabled={disabled}
                        ref={calendarButton}
                        onClick={toggleCalendarVisibility}
                        erÅpen={calendarIsVisible}
                    />
                </div>
                {calendarIsVisible && (
                    <KalenderPortal plassering={kalender && kalender.plassering}>
                        <Kalender
                            ref={calendar}
                            {...kalenderProps}
                            locale={locale}
                            dato={valgtDato}
                            måned={activeMonth}
                            min={avgrensninger && avgrensninger.minDato}
                            maks={avgrensninger && avgrensninger.maksDato}
                            utilgjengeligeDager={avgrensninger ? getUtilgjengeligeDager(avgrensninger) : undefined}
                            onVelgDag={(d: string) => setDateFromCalendar(d, true)}
                            onLukk={() => setCalendarIsVisible(false)}
                            kanVelgeUgyldigDato={kanVelgeUgyldigDato}
                            dayPickerProps={dayPickerProps}
                            visÅrVelger={visÅrVelger}
                        />
                    </KalenderPortal>
                )}
            </div>
        </DomEventContainer>
    );
};
export default Datovelger;
