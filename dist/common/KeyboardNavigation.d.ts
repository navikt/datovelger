/// <reference types="react" />
import * as React from 'react';
export declare type KeyboarActionEvent = (evt: React.KeyboardEvent<any>) => void;
export interface Props {
    onEnter?: KeyboarActionEvent;
    onEscape?: KeyboarActionEvent;
    onArrowUp?: KeyboarActionEvent;
    onArrowDown?: KeyboarActionEvent;
    onArrowLeft?: KeyboarActionEvent;
    onArrowRight?: KeyboarActionEvent;
    onPageDown?: KeyboarActionEvent;
    onPageUp?: KeyboarActionEvent;
    onAltPageDown?: KeyboarActionEvent;
    onAltPageUp?: KeyboarActionEvent;
    onHome?: KeyboarActionEvent;
    onEnd?: KeyboarActionEvent;
}
declare const KeyboardNavigation: React.StatelessComponent<Props>;
export default KeyboardNavigation;
