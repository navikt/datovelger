import React, { useEffect, useRef, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { guid } from 'nav-frontend-js-utils';
import DomEventContainer from './common/DomEventContainer';
import Calendar from './calendar/Calendar';
import DateInput, { DatepickerInputProps } from './DateInput';
import CalendarButton from './elementer/CalendarButton';
import CalendarPortal from './elementer/CalendarPortal';
import { usePrevious } from './hooks/usePrevious';
import { CalendarPlacement, DatepickerLimitations, INVALID_DATE_TYPE, ISODateString } from './types';
import { isISODateString } from './types/typeGuards';
import { getDefaultMonth, getInvalidDates, isSameDate } from './utils';
import { INVALID_DATE_VALUE } from './utils/dateFormatUtils';
import './styles/datovelger.less';

export type DatepickerValue = ISODateString | INVALID_DATE_TYPE | undefined;

export interface DatepickerProps {
    inputId?: string;
    value?: DatepickerValue;
    onChange: (date: DatepickerValue) => void;
    locale?: string;
    disabled?: boolean;
    limitations?: DatepickerLimitations;
    calendarSettings?: {
        showWeekNumbers?: boolean;
        position?: CalendarPlacement;
    };
    inputProps?: DatepickerInputProps & { inputRef?: React.Ref<HTMLInputElement> };
    allowInvalidDateSelection?: boolean;
    showInvalidFormattedDate?: boolean;
    showYearSelector?: boolean;
    dayPickerProps?: DayPickerProps;
}

const Datepicker = ({
    inputId = guid(),
    limitations,
    value,
    inputProps,
    calendarSettings,
    locale = 'nb',
    disabled,
    allowInvalidDateSelection,
    showYearSelector,
    showInvalidFormattedDate,
    onChange,
    dayPickerProps,
}: DatepickerProps) => {
    const [activeMonth, setActiveMonth] = useState<Date>(getDefaultMonth(value, limitations, dayPickerProps));
    const [calendarIsVisible, setCalendarIsVisible] = useState<boolean>(false);

    const dateInput = useRef(null);
    const calendar = useRef(null);

    const prevValue = usePrevious(value);
    useEffect(() => {
        if (value !== prevValue) {
            const defaultMonth = getDefaultMonth(value, limitations, dayPickerProps);
            if (!isSameDate(defaultMonth, activeMonth)) {
                setActiveMonth(defaultMonth);
            }
        }
    }, [value, limitations, prevValue, activeMonth, dayPickerProps]);

    const setDate = (dateString: DatepickerValue | undefined) => {
        setCalendarIsVisible(false);
        onChange(isISODateString(dateString) ? dateString : showInvalidFormattedDate ? INVALID_DATE_VALUE : undefined);
    };

    return (
        <DomEventContainer>
            <div className="nav-datovelger">
                <div className="nav-datovelger__inputContainer">
                    <DateInput
                        id={inputId}
                        ref={inputProps?.inputRef || dateInput}
                        inputProps={{ ...inputProps, disabled }}
                        dateValue={value}
                        onDateChange={setDate}
                        showInvalidFormattedDate={showInvalidFormattedDate}
                    />
                    <CalendarButton
                        disabled={disabled}
                        onClick={() => setCalendarIsVisible(!calendarIsVisible)}
                        isOpen={calendarIsVisible}
                    />
                </div>
                {calendarIsVisible && (
                    <CalendarPortal plassering={calendarSettings?.position}>
                        <Calendar
                            ref={calendar}
                            showWeekNumbers={calendarSettings?.showWeekNumbers}
                            locale={locale}
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
                        />
                    </CalendarPortal>
                )}
            </div>
        </DomEventContainer>
    );
};
export default Datepicker;
