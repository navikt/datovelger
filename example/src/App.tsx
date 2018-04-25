import * as React from 'react';

import './styles.less';
import DatovelgerWrapper from './DatovelgerWrapper';

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
			<div className="App">
				<div className="App__content">
					<h1>Datovelger</h1>
					<DatovelgerWrapper />
				</div>
			</div>
		);
	}
}
export default DatovelgerApp;
