import * as React from 'react';
import Datovelger from '../../src/datovelger';

import './styles.less';

export interface State {
	dato: Date | undefined;
}
export interface Props {}

export class DatovelgerApp extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.onVelgDag = this.onVelgDag.bind(this);
		this.state = {
			dato: undefined
		};
	}
	onVelgDag(dato: Date) {
		console.log(dato);
	}
	render() {
		return (
			<div>
				<h1>Datovelger</h1>
				<Datovelger id="datovelger" onVelgDag={this.onVelgDag} />
			</div>
		);
	}
}
export default DatovelgerApp;
