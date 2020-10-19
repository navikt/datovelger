import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import { InputDateString, ISODateString } from './types';
import {
    InputDateStringToISODateString,
    INVALID_DATE_VALUE,
    ISODateStringToInputDateString,
} from './utils/dateFormatUtils';

export type DatepickerInputProps = Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'aria-invalid' | 'aria-label' | 'aria-describedby' | 'placeholder' | 'disabled' | 'pattern'
>;

interface Props {
    id?: string;
    dateValue?: ISODateString;
    onDateChange: (date: ISODateString | string | undefined) => void;
    inputProps?: DatepickerInputProps;
}

const getInitialValue = (dateValue: string): string => {
    const inputDateString = ISODateStringToInputDateString(dateValue);
    return inputDateString === INVALID_DATE_VALUE ? dateValue : inputDateString;
};

const DateInput = React.forwardRef(function DateInput(
    { id, dateValue = '', inputProps, onDateChange }: Props,
    ref: React.Ref<HTMLInputElement>
) {
    const [inputValue, setInputValue] = useState<InputDateString>(getInitialValue(dateValue));

    const triggerValueChange = (value = '') => {
        const isoDateString = InputDateStringToISODateString(value.trim());
        if (isoDateString !== INVALID_DATE_VALUE) {
            onDateChange(isoDateString);
        } else {
            onDateChange(value);
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
            triggerValueChange((evt.target as HTMLInputElement).value);
        }
    };

    useEffect(() => {
        const inputDateString = ISODateStringToInputDateString(dateValue);
        if (inputDateString !== INVALID_DATE_VALUE) {
            setInputValue(dateValue === undefined || dateValue === '' ? '' : inputDateString);
        } else {
            setInputValue(dateValue);
        }
    }, [dateValue]);

    return (
        <input
            ref={ref}
            id={id}
            pattern="\\d{2}.\\d{2}.\\d{4}"
            {...inputProps}
            className={`nav-datovelger__input${
                inputProps && inputProps['aria-invalid'] === true ? ' skjemaelement__input--harFeil' : ''
            }`}
            autoComplete="off"
            autoCorrect="off"
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
