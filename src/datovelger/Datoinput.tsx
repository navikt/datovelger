import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { InputDateString, ISODateString } from './types';
import {
    InputDateStringToISODateString,
    INVALID_DATE_VALUE,
    ISODateStringToInputDateString,
} from './utils/dateFormatUtils';
import {formatDateStringIfValid} from "./utils/strictInput";

export interface DatoInputProps {
    valgtDato?: ISODateString;
    onDateChange: (date: ISODateString | undefined) => void;
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
    disabled?: boolean;
    strictInputMode?: boolean;
}

const Datoinput = React.forwardRef(function Datoinput(
    {
        valgtDato = '',
        inputProps = { placeholder: 'dd.mm.åååå' },
        disabled,
        onDateChange,
        strictInputMode
    }: DatoInputProps,
    ref: React.Ref<HTMLInputElement>
) {
    const getInputValueToRender = (inputDateString: InputDateString): string => {
        return inputDateString === INVALID_DATE_VALUE ? '' : inputDateString;
    };

    const [value, setValue] = useState<InputDateString>(ISODateStringToInputDateString(valgtDato));

    useEffect(() => {
        setValue(valgtDato === undefined ? '' : ISODateStringToInputDateString(valgtDato));
    }, [valgtDato]);

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const newValue = evt.target.value;

        if(!!strictInputMode){
            const maybeNewValue = formatDateStringIfValid(newValue);
            if (maybeNewValue !== undefined){
                setValue(maybeNewValue);
            }
        }
        else {
            setValue(newValue);
        }

    };

    const triggerValueChange = (inputValue: string) => {
        const value = (inputValue || '').trim();
        if (value === '') {
            onDateChange(undefined);
            return;
        }
        const isoDateString = InputDateStringToISODateString(value);
        if (isoDateString !== INVALID_DATE_VALUE) {
            if (isoDateString !== valgtDato) {
                onDateChange(isoDateString);
                setValue(isoDateString);
            }
        } else {
            setValue('');
            onDateChange(INVALID_DATE_VALUE);
        }
    };

    const onBlur = (evt: FocusEvent<HTMLInputElement>) => {
        triggerValueChange(evt.target.value);
    };

    const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            triggerValueChange((evt.target as HTMLInputElement).value || '');
        }
    };

    return (
        <input
            {...{ placeholder: 'dd.mm.åååå', ...inputProps }}
            ref={ref}
            className="nav-datovelger__input"
            disabled={disabled}
            autoComplete="off"
            autoCorrect="off"
            pattern="\d{2}.\d{2}.\d{4}"
            type="text"
            inputMode="text"
            value={getInputValueToRender(value)}
            maxLength={10}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
});
export default Datoinput;
