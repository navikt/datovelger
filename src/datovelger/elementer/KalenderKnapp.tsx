import React from 'react';
import { Tekster } from '../tekster';
import KalenderIkon from './KalenderIkon';

export interface Props {
    onClick: () => void;
    disabled?: boolean;
    erÅpen: boolean;
}

class KalenderKnapp extends React.Component<Props> {
    button: HTMLButtonElement | null = null;
    focus() {
        if (this.button) {
            this.button.focus();
        }
    }
    render() {
        const { onClick, erÅpen, disabled } = this.props;

        return (
            <button
                ref={(c) => (this.button = c)}
                type="button"
                className="nav-datovelger__kalenderknapp"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                disabled={disabled}
                aria-label={Tekster.kalenderLabel}
                aria-expanded={erÅpen}>
                <KalenderIkon />
            </button>
        );
    }
}
export default KalenderKnapp;
