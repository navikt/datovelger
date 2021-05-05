import { NavigationFocusElement } from '../calendar/Calendar';
import { focusFirstElement, focusLastElement } from './focusUtils';

type RefHTMLElement = HTMLElement | null;

export const setInitialDayFocus = (calendar: RefHTMLElement) => {
    if (calendar) {
        const el: HTMLElement =
            (calendar.querySelector(`.DayPicker-Day--selected`) as HTMLElement) ||
            (calendar.querySelector(`.DayPicker-Day--today`) as HTMLElement) ||
            (calendar.querySelector(`.DayPicker-Day[aria-disabled="false"]`) as HTMLElement);
        if (el) {
            el.focus();
        }
    }
};
export const setFocusOnFirstElementInDayPickerCaption = (calendar: RefHTMLElement) => {
    if (calendar) {
        const el: HTMLElement = calendar.querySelector(`.DayPicker-Caption`) as HTMLElement;
        if (el) {
            focusFirstElement(el);
        }
    }
};
export const setFocusOnLastElementInDayPickerCaption = (calendar: RefHTMLElement) => {
    if (calendar) {
        const el: HTMLElement = calendar.querySelector(`.DayPicker-Caption`) as HTMLElement;
        if (el) {
            focusLastElement(el);
        }
    }
};

const getMonthElement = (calendar: RefHTMLElement, focusElement: NavigationFocusElement): HTMLElement | undefined => {
    let el: any;
    if (calendar) {
        switch (focusElement) {
            case 'previousMonth':
            case 'nextMonth':
                el = calendar.querySelector(`.nav-datovelger__navbar__knapp--${focusElement}`);
                break;
            case 'year':
                el = calendar.querySelector(`select[name=year]`);
                break;
            case 'month':
                el = calendar.querySelector(`select[name=month]`);
                break;
        }
    }
    if (el && el !== null) {
        return el;
    }
    return undefined;
};

export const setFocusOnCalendarMonth = (calendar: RefHTMLElement, focusElement: NavigationFocusElement) => {
    if (calendar) {
        const el = getMonthElement(calendar, focusElement);
        if (el) {
            el.focus();
        }
    }
};
