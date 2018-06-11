/// <reference types="react" />
import * as React from 'react';
export interface Props {
    date?: Date;
    onDateChange: (date: Date | undefined) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    onInputChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}
export interface State {
    value: string;
}
export declare const dateRegExp: RegExp;
export declare class Input extends React.Component<Props, State> {
    input: HTMLInputElement | null;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    focus(): void;
    onBlur(evt: React.FocusEvent<HTMLInputElement>): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    triggerDateChange(): void;
    render(): JSX.Element;
}
export default Input;
