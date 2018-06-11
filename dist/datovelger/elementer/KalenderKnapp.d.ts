/// <reference types="react" />
import * as React from 'react';
export interface Props {
    onClick: () => void;
    disabled?: boolean;
    erÅpen: boolean;
}
declare class KalenderKnapp extends React.Component<Props> {
    button: HTMLButtonElement | null;
    constructor(props: Props);
    focus(): void;
    render(): JSX.Element;
}
export default KalenderKnapp;
