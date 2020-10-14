import React from 'react';
import classnames from 'classnames';
import { CalendarPlacement } from '../types';

export interface Props {
    plassering?: CalendarPlacement;
}

class CalendarPortal extends React.Component<Props> {
    render() {
        const { children, plassering = 'responsive' } = this.props;
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
export default CalendarPortal;
