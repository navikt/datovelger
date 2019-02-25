import * as React from 'react';
export interface Props {
    valgtDato?: string;
    onDateChange: (date: string | undefined) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    onInputChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
    isDatePickerTarget?: boolean;
    disabled?: boolean;
}
export interface State {
    value: string;
}
export declare class Datoinput extends React.Component<Props, State> {
    input: HTMLInputElement | null;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    updateAfterDateChange(nextSelectedDate: string): void;
    triggerDateChange(): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    focus(): void;
    onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
export default Datoinput;
