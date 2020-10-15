import React from 'react';
import classnames from 'classnames';
import { CalendarPlacement } from '../types';

export interface Props {
    position?: CalendarPlacement;
}

class CalendarPortal extends React.Component<Props> {
    render() {
        const { children, position = 'responsive' } = this.props;
        return (
            <div
                className={classnames('nav-datovelger__kalenderPortal', `nav-datovelger__kalenderPortal--${position}`)}>
                <div className="nav-datovelger__kalenderPortal__content">{children}</div>
            </div>
        );
    }
}
export default CalendarPortal;
