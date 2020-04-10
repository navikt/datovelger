import { NavFocusElement } from '../kalender/Kalender';
import { dagDatoNøkkel } from './';

type RefHTMLElement = HTMLElement | null;

export const fokuserPåDato = (kalender: RefHTMLElement, dato: Date) => {
    if (kalender) {
        const el: HTMLElement = kalender.querySelector(`[data-date="${dagDatoNøkkel(dato)}"]`) as HTMLElement;
        if (el) {
            (el.parentNode as HTMLElement).focus();
        }
    }
};

const getMånedFokusDomElement = (kalender: RefHTMLElement, fokusElement: NavFocusElement): HTMLElement | undefined => {
    let el: any;
    if (kalender) {
        switch (fokusElement) {
            case 'forrige':
            case 'neste':
                el = kalender.querySelector(`.nav-datovelger__navbar__knapp--${fokusElement}`);
                break;
            case 'aar':
                el = kalender.querySelector(`select[name=year]`);
                break;
            case 'mnd':
                el = kalender.querySelector(`select[name=month]`);
                break;
        }
    }
    if (el && el !== null) {
        return el;
    }
    return undefined;
};

export const fokuserPåMåned = (kalender: RefHTMLElement, fokusElement: NavFocusElement) => {
    if (kalender) {
        const el = getMånedFokusDomElement(kalender, fokusElement);
        if (el) {
            el.focus();
        }
    }
};
