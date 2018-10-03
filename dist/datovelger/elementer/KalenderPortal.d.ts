import * as React from 'react';
import { KalenderPlassering } from '../types';
export interface Props {
    plassering?: KalenderPlassering;
}
declare class KalenderPortal extends React.Component<Props, {}> {
    render(): React.ReactPortal;
}
export default KalenderPortal;
