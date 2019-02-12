import * as React from 'react';
import * as classnames from 'classnames';
import { formatDateInputValue, formatInputToISOString } from './utils';

export interface Props {
	selectedDate?: string;
	onDateChange: (date: string | undefined) => void;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	onInputChange?: (
		value: string,
		evt: React.ChangeEvent<HTMLInputElement>
	) => void;
	isDatePickerTarget?: boolean;
	disabled?: boolean;
}

export interface State {
	value: string;
}

export class Input extends React.Component<Props, State> {
	input: HTMLInputElement | null;

	constructor(props: Props) {
		super(props);
		this.focus = this.focus.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.triggerDateChange = this.triggerDateChange.bind(this);
		this.state = {
			value: formatDateInputValue(props.selectedDate)
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.selectedDate !== this.props.selectedDate) {
			this.setState({
				value: formatDateInputValue(nextProps.selectedDate)
			});
		}
	}

	focus() {
		if (this.input) {
			this.input.focus();
		}
	}

	onBlur() {
		this.triggerDateChange();
	}

	onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
		if (evt.key === 'Enter') {
			evt.preventDefault();
			this.triggerDateChange();
		}
	}

	onChange(evt: React.ChangeEvent<HTMLInputElement>) {
		const value = evt.target.value;
		if (this.props.onInputChange) {
			this.props.onInputChange(value, evt);
		}
		this.setState({ value });
	}

	triggerDateChange() {
		const ISOString = formatInputToISOString(this.state.value);
		if (ISOString !== this.props.selectedDate) {
			this.props.onDateChange(ISOString);
		}
	}

	render() {
		const { inputProps, disabled } = this.props;
		return (
			<input
				{...inputProps}
				className={classnames('nav-datovelger__input', {
					'nav-datovelger__input--datePickerTarget': this.props
						.isDatePickerTarget
				})}
				disabled={disabled}
				autoComplete="off"
				autoCorrect="off"
				pattern="\d{2}.\d{2}.\d{4}"
				type="text"
				ref={(c) => (this.input = c)}
				value={this.state.value}
				maxLength={10}
				onChange={this.onChange}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown}
			/>
		);
	}
}
export default Input;
