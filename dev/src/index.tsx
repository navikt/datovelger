import * as React from 'react';

import Datovelger from 'datovelger';

export interface Props {}

export class DatovelgerTestApp extends React.Component<Props, {}> {
	render() {
		return (
			<div>
				<Datovelger id="" onVelgDag={() => null} />
			</div>
		);
	}
}
export default DatovelgerTestApp;
