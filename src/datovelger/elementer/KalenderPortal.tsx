import * as React from 'react';
import { createPortal } from 'react-dom';
import * as classnames from 'classnames';
import { KalenderPlassering } from '../types';

export interface Props {
	plassering?: KalenderPlassering;
}

class KalenderPortal extends React.Component<Props, {}> {
	render() {
		const { children, plassering } = this.props;
		return createPortal(
			<div
				className={classnames(
					'nav-datovelger__kalenderPortal',
					`nav-datovelger__kalenderPortal--${plassering}`
				)}>
				<div className="nav-datovelger__kalenderPortal__content">
					{children}
				</div>
			</div>,
			document.body
		);
	}
}
export default KalenderPortal;
