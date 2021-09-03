import FocusTrap from 'focus-trap-react';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import DayPicker, { DayModifiers, DayPickerProps, LocaleUtils, Modifier } from 'react-day-picker';
import DomEventContainer from '../common/DomEventContainer';
import { DatepickerLocales, ISODateString } from '../types';
import {
    setFocusOnCalendarMonth,
    setFocusOnFirstElementInDayPickerCaption,
    setFocusOnLastElementInDayPickerCaption,
    setInitialDayFocus,
} from '../utils/calendarFocusUtils';
import calendarLocaleUtils from '../utils/calendarLocaleUtils';
import { dateToISODateString, ISODateStringToUTCDate } from '../utils/dateFormatUtils';
import Navbar from './Navbar';

require('dayjs/locale/nb.js');
require('dayjs/locale/nn.js');

interface Props {
    month: Date;
    dateString?: ISODateString;
    minDateString?: ISODateString;
    maxDateString?: ISODateString;
    localeUtils?: LocaleUtils;
    onSelect: (dateString: ISODateString) => void;
    onClose: () => void;
    unavailableDates?: Modifier[];
    allowInvalidDateSelection?: boolean;
    showWeekNumbers?: boolean;
    showYearSelector?: boolean;
    locale: DatepickerLocales;
    dayPickerProps?: DayPickerProps;
    setFocusOnDateWhenOpened?: boolean;
    allowNavigationToDisabledMonths: boolean;
}

export type NavigationFocusElement = 'nextMonth' | 'previousMonth' | 'year' | 'month';

const Calendar = React.forwardRef(function Calendar(props: Props, ref: React.Ref<HTMLDivElement>) {
    const [displayMonth, setDisplayMonth] = useState<Date>(props.month);

    const {
        dateString,
        minDateString,
        maxDateString,
        localeUtils,
        showWeekNumbers,
        unavailableDates,
        showYearSelector,
        allowInvalidDateSelection,
        locale,
        onClose,
        onSelect,
        setFocusOnDateWhenOpened,
        dayPickerProps,
        allowNavigationToDisabledMonths,
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
        if (dayPickerProps?.onMonthChange) {
            dayPickerProps?.onMonthChange(month);
        }
    };

    const dayPickerPropsToUse: DayPickerProps = {
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
                    localeUtils={{
                        ...calendarLocaleUtils,
                        ...localeUtils,
                    }}
                    showYearSelector={showYearSelector}
                    allowNavigationToDisabledMonths={allowNavigationToDisabledMonths}
                    locale={locale}
                />
            );
        },
        firstDayOfWeek: 1,
        showWeekNumbers,
    };

    const calendarRef = useRef<any>();
    useEffect(() => {
        if (setFocusOnDateWhenOpened && calendarRef.current) {
            setInitialDayFocus(calendarRef.current);
        }
    }, [calendarRef, setFocusOnDateWhenOpened]);

    return (
        <div ref={ref} role="dialog" aria-label="Kalender" className="nav-datovelger__kalender">
            <DomEventContainer
                onKeyDown={(evt) => {
                    if (evt.key === 'Tab' && evt.target) {
                        const className: string = (evt.target as any).className || '';
                        if (className.indexOf('DayPicker-Day') >= 0) {
                            if (evt.shiftKey === false) {
                                setFocusOnFirstElementInDayPickerCaption(calendarRef.current);
                            } else {
                                setFocusOnLastElementInDayPickerCaption(calendarRef.current);
                            }
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                }}>
                <div ref={calendarRef}>
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
                            canChangeMonth={false}
                            selectedDays={dateString ? ISODateStringToUTCDate(dateString) : undefined}
                            onDayClick={onSelectDate}
                            onMonthChange={onChangeMonth}
                            disabledDays={unavailableDates}
                            {...dayPickerProps}
                            {...dayPickerPropsToUse}
                            month={displayMonth}
                        />
                    </FocusTrap>
                </div>
            </DomEventContainer>
        </div>
    );
});
export default Calendar;
