import * as React from 'react';
export interface Props {
    onClick: () => void;
    erÅpen: boolean;
}
declare class KalenderKnapp extends React.Component<Props> {
    button: HTMLButtonElement | null;
    constructor(props: Props);
    focus(): void;
    render(): JSX.Element;
}
export default KalenderKnapp;
