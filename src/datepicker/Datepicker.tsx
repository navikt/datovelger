import React, { useEffect, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { guid } from 'nav-frontend-js-utils';
import DomEventContainer from './common/DomEventContainer';
import Calendar from './calendar/Calendar';
import DateInput, { DatepickerInputProps } from './DateInput';
import CalendarButton from './elementer/CalendarButton';
import CalendarPortal from './elementer/CalendarPortal';
import { usePrevious } from './hooks/usePrevious';
import { CalendarPlacement, DatepickerLimitations, ISODateString } from './types';
import { isISODateString } from './types/typeGuards';
import { getDefaultMonth, getInvalidDates, isSameDate } from './utils';
import './styles/datepicker.less';

export type DatepickerValue = ISODateString | string;

export interface DatepickerProps {
    inputId?: string;
    value?: string | undefined;
    onChange: (value: DatepickerValue, isValidISODateString: boolean) => void;
    locale?: string;
    disabled?: boolean;
    limitations?: DatepickerLimitations;
    calendarSettings?: {
        showWeekNumbers?: boolean;
        position?: CalendarPlacement;
    };
    inputProps?: DatepickerInputProps & { inputRef?: React.Ref<HTMLInputElement> };
    allowInvalidDateSelection?: boolean;
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
    onChange,
    dayPickerProps,
}: DatepickerProps) => {
    const [activeMonth, setActiveMonth] = useState<Date>(getDefaultMonth(value, limitations, dayPickerProps));
    const [calendarIsVisible, setCalendarIsVisible] = useState<boolean>(false);

    const prevValue = usePrevious(value);
    useEffect(() => {
        if (value !== prevValue) {
            const defaultMonth = getDefaultMonth(value, limitations, dayPickerProps);
            if (!isSameDate(defaultMonth, activeMonth)) {
                setActiveMonth(defaultMonth);
            }
        }
    }, [value, limitations, prevValue, activeMonth, dayPickerProps]);

    const setDate = (value: DatepickerValue = '') => {
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
