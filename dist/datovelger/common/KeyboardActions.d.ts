/// <reference types="react" />
import * as React from 'react';
export declare type NavigationKeys = 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'End' | 'Home' | 'PageDown' | 'PageUp';
export declare type WhitespaceKeys = 'Tab' | 'Enter';
export declare type ModifierKeys = 'Alt' | 'CapsLock' | 'Control' | 'Fn' | 'Shift';
export declare type UIKeys = 'Escape' | 'Cancel';
export declare type KeyType = NavigationKeys | WhitespaceKeys | ModifierKeys | UIKeys;
export interface KeyboardAction {
    name: string;
    key: KeyType;
    onAction: (evt: React.KeyboardEvent<any>) => void;
    shiftKey?: boolean;
    altKey?: boolean;
    ctrlKey?: boolean;
}
export interface Props {
    actions: KeyboardAction[];
}
export declare class KeyboardActions extends React.Component<Props> {
    constructor(props: Props);
    onKeyDown(evt: React.KeyboardEvent<any>): void;
    render(): JSX.Element;
}
export default KeyboardActions;
