import React from 'react';
import { Texts } from '../texts';
import CalendarIcon from './CalendarIcon';

export interface Props {
    onClick: () => void;
    disabled?: boolean;
    isOpen: boolean;
}

class CalendarButton extends React.Component<Props> {
    button: HTMLButtonElement | null = null;
    focus() {
        if (this.button) {
            this.button.focus();
        }
    }
    render() {
        const { onClick, isOpen, disabled } = this.props;

        return (
            <button
                ref={(c) => (this.button = c)}
                type="button"
                className="nav-datovelger__kalenderknapp"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick();
                }}
                disabled={disabled}
                aria-label={Texts.calendarLabel}
                aria-expanded={isOpen}>
                <CalendarIcon />
            </button>
        );
    }
}
export default CalendarButton;
