import { NavigationFocusElement } from '../calendar/Calendar';
import { dayDateKey } from '.';

type RefHTMLElement = HTMLElement | null;

export const setFocusOnDate = (calendar: RefHTMLElement, dato: Date) => {
    if (calendar) {
        const el: HTMLElement = calendar.querySelector(`[data-date="${dayDateKey(dato)}"]`) as HTMLElement;
        if (el) {
            (el.parentNode as HTMLElement).focus();
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

export const setFocusOnCalendarMonth = (calendar: RefHTMLElement, fokusElement: NavigationFocusElement) => {
    if (calendar) {
        const el = getMonthElement(calendar, fokusElement);
        if (el) {
            el.focus();
        }
    }
};
