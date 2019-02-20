import * as React from 'react';
import { DatovelgerCommonProps, DateInputProps } from './Datovelger';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import Kalender from './kalender/Kalender';
import { DayModifiers, Modifier } from 'react-day-picker';
export interface Props extends DatovelgerCommonProps {
    startdato?: string;
    sluttdato?: string;
    startInputProps: DateInputProps;
    sluttInputProps: DateInputProps;
    onChange: (fra: string, til: string) => void;
}
export interface State {
    måned: Date;
    erÅpen?: boolean;
    fra?: string;
    til?: string;
    hoverTil?: string;
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
    onStartdateChange(fra: string): void;
    onStartInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>): void;
    onSluttdateChange(til: string): void;
    onSluttInputChange(verdi: string, evt: React.ChangeEvent<HTMLInputElement>): void;
    onVelgDato(dato: string, lukkKalender?: boolean): void;
    onMouseEnter(dato: Date): void;
    onDayFocus(dato: string, modifiers: DayModifiers, evt: React.KeyboardEvent<HTMLDivElement>): void;
    toggleKalender(start?: string): void;
    lukkKalender(settFokusPåKalenderknapp?: boolean): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    getSelectedDays(): Modifier[];
    render(): JSX.Element;
}
export default Periodevelger;
