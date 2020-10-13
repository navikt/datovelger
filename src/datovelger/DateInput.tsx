import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import { InputDateString, INVALID_DATE_TYPE, ISODateString } from './types';
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
    dateValue?: ISODateString;
    onDateChange: (date: ISODateString | INVALID_DATE_TYPE | undefined) => void;
    inputProps?: DatepickerInputProps;
    showInvalidFormattedDate?: boolean;
}

const getInitialValue = (dateValue: string): string => {
    const inputDateString = ISODateStringToInputDateString(dateValue);
    return inputDateString === INVALID_DATE_VALUE ? '' : inputDateString;
};

const DateInput = React.forwardRef(function Datoinput(
    { id, dateValue = '', inputProps = { placeholder: 'dd.mm.åååå' }, onDateChange, showInvalidFormattedDate }: Props,
    ref: React.Ref<HTMLInputElement>
) {
    const [inputValue, setInputValue] = useState<InputDateString>(getInitialValue(dateValue));

    const triggerValueChange = (inputValue: string) => {
        const value = (inputValue || '').trim();
        if (value === '') {
            onDateChange(undefined);
            return;
        }
        const isoDateString = InputDateStringToISODateString(value);
        if (isoDateString !== INVALID_DATE_VALUE) {
            if (isoDateString !== value) {
                onDateChange(isoDateString);
            }
            setInputValue(ISODateStringToInputDateString(isoDateString));
        } else {
            if (!showInvalidFormattedDate) {
                setInputValue('');
            }
            onDateChange(INVALID_DATE_VALUE);
        }
    };

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value);
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

    useEffect(() => {
        if (dateValue === INVALID_DATE_VALUE && showInvalidFormattedDate) {
            return;
        }
        if (dateValue === '' || dateValue === undefined) {
            setInputValue('');
            return;
        }
        const inputDateString = ISODateStringToInputDateString(dateValue);
        if (inputDateString !== INVALID_DATE_VALUE) {
            setInputValue(dateValue === undefined || dateValue === '' ? '' : inputDateString);
        }
    }, [dateValue, showInvalidFormattedDate]);

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
            value={inputValue}
            maxLength={10}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
});
export default DateInput;
