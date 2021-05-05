import React, { useEffect, useRef, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { guid } from 'nav-frontend-js-utils';
import DomEventContainer from './common/DomEventContainer';
import Calendar from './calendar/Calendar';
import DateInput, { DatepickerInputProps } from './DateInput';
import CalendarButton from './elementer/CalendarButton';
import CalendarPortal from './elementer/CalendarPortal';
import { usePrevious } from './hooks/usePrevious';
import { CalendarPlacement, DatepickerLimitations, DatepickerLocales, ISODateString } from './types';
import { isISODateString } from './types/typeGuards';
import { getDefaultMonth, getInvalidDates, isSameDate } from './utils';
import './styles/datepicker.less';

export type DatepickerValue = ISODateString | string;

export type DatepickerChange = (value: DatepickerValue, isValidISODateString: boolean) => void;

export interface DatepickerProps {
    inputId?: string;
    value?: string | undefined;
    onChange: DatepickerChange;
    disabled?: boolean;
    limitations?: DatepickerLimitations;
    calendarSettings?: {
        showWeekNumbers?: boolean;
        position?: CalendarPlacement;
    };
    locale?: DatepickerLocales;
    inputProps?: DatepickerInputProps & { inputRef?: React.Ref<HTMLInputElement> };
    allowInvalidDateSelection?: boolean;
    showYearSelector?: boolean;
    dayPickerProps?: DayPickerProps;
    setFocusOnDateWhenOpened?: boolean;
}

const Datepicker = ({
    inputId = guid(),
    limitations,
    value,
    inputProps,
    calendarSettings,
    disabled,
    allowInvalidDateSelection,
    locale = 'nb',
    showYearSelector,
    onChange,
    dayPickerProps,
    setFocusOnDateWhenOpened,
}: DatepickerProps) => {
    const [activeMonth, setActiveMonth] = useState<Date>(getDefaultMonth(value, limitations, dayPickerProps));
    const [calendarIsVisible, setCalendarIsVisible] = useState<boolean>(false);
    const prevValue = usePrevious(value);
    const initialMonthPrevValue = usePrevious(dayPickerProps?.initialMonth);

    const calendarRef = useRef<any>();

    useEffect(() => {
        const initialMonth = dayPickerProps?.initialMonth;
        if (initialMonth !== initialMonthPrevValue && value === prevValue) {
            const defaultMonth = getDefaultMonth(value, limitations, dayPickerProps);
            if (!isSameDate(defaultMonth, activeMonth)) {
                setActiveMonth(defaultMonth);
            }
        }
        if (value !== prevValue) {
            const defaultMonth = getDefaultMonth(value, limitations, dayPickerProps);
            if (!isSameDate(defaultMonth, activeMonth)) {
                setActiveMonth(defaultMonth);
            }
        }
    }, [value, limitations, prevValue, activeMonth, dayPickerProps, initialMonthPrevValue]);

    const setDate = (value = '') => {
        setCalendarIsVisible(false);
        onChange(value, isISODateString(value));
    };
    return (
        <DomEventContainer>
            <div className="nav-datovelger">
                <div className="nav-datovelger__inputContainer">
                    <DateInput
                        id={inputId}
                        ref={inputProps?.inputRef}
                        inputProps={{ ...inputProps, disabled }}
                        dateValue={value}
                        onDateChange={setDate}
                    />
                    <CalendarButton
                        disabled={disabled}
                        onClick={() => setCalendarIsVisible(!calendarIsVisible)}
                        isOpen={calendarIsVisible}
                    />
                </div>
                {calendarIsVisible && (
                    <CalendarPortal position={calendarSettings?.position}>
                        <Calendar
                            ref={calendarRef}
                            locale={locale}
                            showWeekNumbers={calendarSettings?.showWeekNumbers}
                            dateString={value}
                            month={activeMonth}
                            minDateString={limitations && limitations.minDate}
                            maxDateString={limitations && limitations.maxDate}
                            unavailableDates={limitations ? getInvalidDates(limitations) : undefined}
                            onSelect={setDate}
                            onClose={() => setCalendarIsVisible(false)}
                            allowInvalidDateSelection={allowInvalidDateSelection}
                            dayPickerProps={dayPickerProps}
                            showYearSelector={showYearSelector}
                            setFocusOnDateWhenOpened={setFocusOnDateWhenOpened}
                        />
                    </CalendarPortal>
                )}
            </div>
        </DomEventContainer>
    );
};
export default Datepicker;
