import React from 'react';
import classnames from 'classnames';
import { formatDateInputValue, formatInputToISODateFormatStrig } from './utils';
import { erDatoGyldig } from './utils/datovalidering';

export interface DatoInputProps {
    valgtDato?: string;
    onDateChange: (date: string | undefined) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    onInputChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
    isDatePickerTarget?: boolean;
    disabled?: boolean;
}

interface State {
    value: string;
}

export class Datoinput extends React.Component<DatoInputProps, State> {
    input: HTMLInputElement | null = null;

    constructor(props: DatoInputProps) {
        super(props);
        this.focus = this.focus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.triggerDateChange = this.triggerDateChange.bind(this);
        this.state = {
            value: props.valgtDato ? formatDateInputValue(props.valgtDato) : ''
        };
    }

    componentWillReceiveProps(nextProps: DatoInputProps) {
        if (nextProps.valgtDato) {
            this.updateAfterDateChange(nextProps.valgtDato);
        }
    }

    updateAfterDateChange(nextSelectedDate: string) {
        if (this.props.valgtDato !== nextSelectedDate && erDatoGyldig(nextSelectedDate)) {
            this.setState({
                value: formatDateInputValue(nextSelectedDate)
            });
        } else if (nextSelectedDate === '') {
            this.setState({
                value: ''
            });
        }
    }

    triggerDateChange() {
        if (this.state.value === '') {
            this.props.onDateChange(undefined);
            return;
        }
        const ISODateString = formatInputToISODateFormatStrig(this.state.value);
        if (ISODateString !== this.props.valgtDato) {
            this.props.onDateChange(ISODateString);
        }
    }

    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            this.triggerDateChange();
        }
    }

    focus() {
        if (this.input) {
            this.input.focus();
        }
    }

    onChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const value = evt.target.value;
        if (this.props.onInputChange) {
            this.props.onInputChange(value, evt);
        }
        this.setState({ value });
    }

    render() {
        const { inputProps, disabled } = this.props;
        return (
            <input
                {...inputProps}
                className={classnames('nav-datovelger__input', {
                    'nav-datovelger__input--datePickerTarget': this.props.isDatePickerTarget
                })}
                disabled={disabled}
                autoComplete="off"
                autoCorrect="off"
                pattern="\d{2}.\d{2}.\d{4}"
                type="text"
                inputMode="numeric"
                ref={(c) => (this.input = c)}
                value={this.state.value || ''}
                maxLength={10}
                onChange={this.onChange}
                // onBlur={this.triggerDateChange}
                // onKeyDown={this.onKeyDown}
            />
        );
    }
}
export default Datoinput;
