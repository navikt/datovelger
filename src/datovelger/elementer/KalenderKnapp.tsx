import * as React from 'react';
import KalenderIkon from './KalenderIkon';
import { Tekster } from '../tekster';

export interface Props {
	onClick: () => void;
	disabled?: boolean;
	erÅpen: boolean;
}

class KalenderKnapp extends React.Component<Props> {
	button: HTMLButtonElement | null;
	constructor(props: Props) {
		super(props);
	}
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
				role="button"
				disabled={disabled}
				aria-label={Tekster.kalenderLabel}
				aria-expanded={erÅpen}>
				<KalenderIkon />
			</button>
		);
	}
}
export default KalenderKnapp;
