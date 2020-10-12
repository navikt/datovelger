import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import { InputDateString, ISODateString } from './types';
import {
    InputDateStringToISODateString,
    INVALID_DATE_VALUE,
    ISODateStringToInputDateString,
} from './utils/dateFormatUtils';

export type DatepickerInputProps = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'aria-invalid' | 'aria-label' | 'aria-describedby' | 'placeholder' | 'disabled'
>;

interface Props {
    id?: string;
    value?: ISODateString;
    onDateChange: (date: ISODateString | undefined) => void;
    inputProps?: DatepickerInputProps;
    onInputChange?: (value: InputDateString, evt: React.ChangeEvent<HTMLInputElement>) => void;
    showInvalidFormattedDate?: boolean;
}

// enum DATE_VALUE_STATE {
//     'VALID' = 'valid',
//     'INVALID' = 'invalid',
//     'UNDEFINED' = 'undefined',
// }

const DateInput = React.forwardRef(function Datoinput(
    { id, value: valgtDato = '', inputProps = { placeholder: 'dd.mm.åååå' }, onDateChange, onInputChange }: Props,
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
        const inputValue = evt.target.value;
        setValue(inputValue);
        if (onInputChange) {
            onInputChange(inputValue, evt);
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
            }
            setValue(ISODateStringToInputDateString(isoDateString));
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
            id={id}
            {...{ placeholder: 'dd.mm.åååå', ...inputProps }}
            ref={ref}
            className={`nav-datovelger__input${
                inputProps['aria-invalid'] === true ? ' skjemaelement__input--harFeil' : ''
            }`}
            disabled={inputProps?.disabled}
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
export default DateInput;
