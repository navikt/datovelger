/// <reference types="react" />
import * as React from 'react';
import './styles.less';
export interface State {
    dato: Date | undefined;
}
export interface Props {
}
export declare class DatovelgerApp extends React.Component<Props, State> {
    constructor(props: Props);
    onVelgDag(dato: Date): void;
    render(): JSX.Element;
}
export default DatovelgerApp;
