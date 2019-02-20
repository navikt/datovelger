import * as React from 'react';
import { KalenderPlassering } from '../types';
export interface Props {
    plassering?: KalenderPlassering;
}
declare class KalenderPortal extends React.Component<Props, {}> {
    render(): JSX.Element;
}
export default KalenderPortal;
