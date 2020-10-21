import FocusTrap from 'focus-trap-react';
import React, { MutableRefObject, useState } from 'react';
import DayPicker, { DayModifiers, DayPickerProps, LocaleUtils, Modifier } from 'react-day-picker';
import { ISODateString } from '../types';
import { setFocusOnCalendarMonth } from '../utils/calendarFocusUtils';
import { dateToISODateString, ISODateStringToUTCDate } from '../utils/dateFormatUtils';
import calendarLocaleUtils from '../utils/calendarLocaleUtils';
import Navbar from './Navbar';

interface Props {
    month: Date;
    dateString?: ISODateString;
    minDateString?: ISODateString;
    maxDateString?: ISODateString;
    locale: string;
    localeUtils?: LocaleUtils;
    onSelect: (dateString: ISODateString) => void;
    onClose: () => void;
    unavailableDates?: Modifier[];
    allowInvalidDateSelection?: boolean;
    showWeekNumbers?: boolean;
    showYearSelector?: boolean;
    dayPickerProps?: DayPickerProps;
}

export type NavigationFocusElement = 'nextMonth' | 'previousMonth' | 'year' | 'month';

const Calendar = React.forwardRef(function Calendar(props: Props, ref: React.Ref<HTMLDivElement>) {
    const [displayMonth, setDisplayMonth] = useState<Date>(props.month);

    const {
        dateString,
        minDateString,
        maxDateString,
        locale = 'nb',
        localeUtils,
        showWeekNumbers,
        unavailableDates,
        showYearSelector,
        allowInvalidDateSelection,
        onClose,
        onSelect,
        dayPickerProps,
    } = props;

    const onSelectDate = (date: Date, modifiers: DayModifiers) => {
        if (allowInvalidDateSelection || !modifiers.disabled) {
            onSelect(dateToISODateString(date));
        }
    };

    const onChangeMonth = (month: Date, focusElement?: NavigationFocusElement) => {
        setDisplayMonth(month);
        if (ref) {
            const calendar = (ref as MutableRefObject<HTMLElement>).current;
            if (focusElement) {
                setTimeout(() => {
                    setFocusOnCalendarMonth(calendar, focusElement);
                });
            }
        }
    };

    const dayPickerPropsToUse: DayPickerProps = {
        locale,
        localeUtils: calendarLocaleUtils,
        navbarElement: function navbarElement() {
            return <span />;
        },
        captionElement: function CaptionElement() {
            const minDate = ISODateStringToUTCDate(minDateString);
            const maxDate = ISODateStringToUTCDate(maxDateString);
            return (
                <Navbar
                    defaultMonth={displayMonth}
                    onChangeMonth={onChangeMonth}
                    minDate={minDate}
                    maxDate={maxDate}
                    locale={locale}
                    localeUtils={{
                        ...calendarLocaleUtils,
                        ...localeUtils,
                    }}
                    showYearSelector={showYearSelector}
                />
            );
        },
        firstDayOfWeek: 1,
        showWeekNumbers,
    };

    return (
        <div ref={ref} role="dialog" aria-label="Kalender" className="nav-datovelger__kalender">
            <FocusTrap
                active={true}
                focusTrapOptions={{
                    clickOutsideDeactivates: true,
                    onDeactivate: onClose,
                }}>
                <DayPicker
                    locale={locale}
                    fromMonth={minDateString ? ISODateStringToUTCDate(minDateString) : undefined}
                    toMonth={maxDateString ? ISODateStringToUTCDate(maxDateString) : undefined}
                    month={displayMonth}
                    canChangeMonth={false}
                    selectedDays={dateString ? ISODateStringToUTCDate(dateString) : undefined}
                    onDayClick={onSelectDate}
                    onMonthChange={onChangeMonth}
                    disabledDays={unavailableDates}
                    {...dayPickerPropsToUse}
                    {...dayPickerProps}
                />
            </FocusTrap>
        </div>
    );
});
export default Calendar;