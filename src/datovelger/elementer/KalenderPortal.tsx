import React from 'react';
import classnames from 'classnames';
import { KalenderPlassering } from '../types';

export interface Props {
    plassering?: KalenderPlassering;
}

class KalenderPortal extends React.Component<Props, {}> {
    render() {
        const { children, plassering } = this.props;
        return (
            <div
                className={classnames(
                    'nav-datovelger__kalenderPortal',
                    `nav-datovelger__kalenderPortal--${plassering}`
                )}>
                <div className="nav-datovelger__kalenderPortal__content">{children}</div>
            </div>
        );
    }
}
export default KalenderPortal;
