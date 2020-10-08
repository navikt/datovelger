import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import DomEventContainer from './common/DomEventContainer';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import KalenderPortal from './elementer/KalenderPortal';
import Kalender from './kalender/Kalender';
import { DatovelgerAvgrensninger, ISODateString, KalenderPlassering } from './types';
import { getDefaultMåned, getUtilgjengeligeDager } from './utils';
import { guid } from 'nav-frontend-js-utils';
import './styles/datovelger.less';
import { isISODateString } from './types/typeGuards';

export interface DatovelgerProps {
    id?: string;
    valgtDato?: ISODateString;
    avgrensninger?: DatovelgerAvgrensninger;
    datoErGyldig?: boolean;
    onChange: (date?: ISODateString) => void;
    kalender?: {
        visUkenumre?: boolean;
        plassering?: KalenderPlassering;
    };
    kanVelgeUgyldigDato?: boolean;
    locale?: string;
    disabled?: boolean;
    input?: {
        id?: string;
        name?: string;
        ariaLabel?: string;
        placeholder?: string;
        ariaDescribedby?: string;
        inputRef?: React.Ref<HTMLInputElement>;
    };
    visÅrVelger?: boolean;
    dayPickerProps?: DayPickerProps;
}

const Datovelger = ({
    id = guid(),
    avgrensninger,
    valgtDato,
    dayPickerProps,
    input,
    kalender,
    locale = 'nb',
    disabled,
    visÅrVelger,
    datoErGyldig,
    kanVelgeUgyldigDato,
    onChange,
    ...kalenderProps
}: DatovelgerProps) => {
    const [activeMonth, setActiveMonth] = useState<Date>(getDefaultMåned(valgtDato, avgrensninger, dayPickerProps));
    const [calendarIsVisible, setCalendarIsVisible] = useState<boolean>(false);

    const dateInput = useRef(null);
    const calendar = useRef(null);

    useEffect(() => {
        setActiveMonth(getDefaultMåned(valgtDato, avgrensninger, dayPickerProps));
    }, [valgtDato, avgrensninger, dayPickerProps]);

    const datoErUgyldig = datoErGyldig === false;

    const dateInputProps: Partial<InputHTMLAttributes<HTMLInputElement>> = {
        id: input?.id || id,
        name: input?.name || `${id}__input`,
        'aria-invalid': datoErUgyldig,
        'aria-label': input?.ariaLabel,
        'aria-describedby': input?.ariaDescribedby,
        placeholder: input?.placeholder,
    };

    const setDate = (dateString: ISODateString | undefined, closeCalender?: boolean) => {
        setCalendarIsVisible(false);
        onChange(isISODateString(dateString) ? dateString : undefined);
        if (closeCalender) {
            setCalendarIsVisible(false);
        }
    };

    return (
        <DomEventContainer>
            <div className="nav-datovelger">
                <div className="nav-datovelger__inputContainer">
                    <Datoinput
                        inputProps={dateInputProps}
                        ref={input?.inputRef || dateInput}
                        valgtDato={valgtDato || ''}
                        onDateChange={setDate}
                        disabled={disabled}
                        datoErUgyldig={datoErUgyldig}
                    />
                    <KalenderKnapp
                        disabled={disabled}
                        onClick={() => setCalendarIsVisible(!calendarIsVisible)}
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
                            onVelgDag={(d: string) => setDate(d, true)}
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
