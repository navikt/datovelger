/// <reference types="react" />
import * as React from 'react';
import { DatovelgerCommonProps, DateInputProps } from './Datovelger';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import Kalender from './kalender/Kalender';
import { RangeModifier, DayModifiers } from 'react-day-picker';
export interface Props extends DatovelgerCommonProps {
    startdato?: Date;
    sluttdato?: Date;
    startInputProps: DateInputProps;
    sluttInputProps: DateInputProps;
    onChange: (fra: Date, til: Date) => void;
}
export interface State {
    måned: Date;
    erÅpen?: boolean;
    fra?: Date;
    til?: Date;
    hoverTil?: Date;
    inputTarget?: 'fra' | 'til';
}
declare class Periodevelger extends React.Component<Props, State> {
    startInput: Datoinput | null;
    sluttInput: Datoinput | null;
    startKalenderKnapp: KalenderKnapp | null;
    sluttKalenderKnapp: KalenderKnapp | null;
    kalender: Kalender | null;
    setFokusPåKalenderKnapp: boolean | undefined;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    onStartdateChange(fra: Date): void;
    onStartInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>): void;
    onSluttdateChange(til: Date): void;
    onSluttInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>): void;
    onVelgDato(dato: Date, lukkKalender?: boolean): void;
    onMouseEnter(dato: Date): void;
    onDayFocus(dato: Date, modifiers: DayModifiers, evt: React.KeyboardEvent<HTMLDivElement>): void;
    toggleKalender(start?: Date): void;
    lukkKalender(settFokusPåKalenderknapp?: boolean): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    getSelectedDays(): (Date | RangeModifier)[];
    render(): JSX.Element;
}
export default Periodevelger;
