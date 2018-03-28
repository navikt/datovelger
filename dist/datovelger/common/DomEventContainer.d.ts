/// <reference types="react" />
import * as React from 'react';
export interface ContainerBlurEvent {
    source: 'esc' | 'blur';
}
export declare function contains(node: HTMLElement, child: Element): boolean;
export interface Props extends React.Props<any> {
    onKeyDown?: (evt: React.KeyboardEvent<any>) => void;
    onBlur?: (evt: React.FocusEvent<any> | {
        source: string;
    }) => void;
    onFocus?: (evt: React.FocusEvent<any>) => void;
    active?: boolean;
    className?: string;
    tabIndex?: number;
}
declare class DomEventContainer extends React.Component<Props, {}> {
    domElement: HTMLDivElement | null;
    ignoreDocumentClick: boolean;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    handleBlur(evt: React.FocusEvent<any>): void;
    blur(source: string): void;
    handleDocumentKeyDown(evt: KeyboardEvent): void;
    handleInternalDocumentKeyDown(evt: React.KeyboardEvent<any>): void;
    startEventListening(): void;
    stopEventListening(): void;
    render(): JSX.Element;
}
export default DomEventContainer;
