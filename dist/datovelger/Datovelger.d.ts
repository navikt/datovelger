/// <reference types="react" />
import * as React from 'react';
import { Avgrensninger, KalenderPlassering } from './types';
import { DatoValidering } from './utils/datovalidering';
import { DayPickerProps } from 'react-day-picker';
import KalenderKnapp from './elementer/KalenderKnapp';
import Datoinput from './Datoinput';
import Kalender from './kalender/Kalender';
export { Avgrensninger, Tidsperiode } from './types';
export interface State {
    måned: Date;
    datovalidering: DatoValidering;
    erÅpen?: boolean;
    inputValue: string;
}
export interface DateInputProps {
    id: string;
    placeholder?: string;
    required?: boolean;
    ariaDescribedby?: string;
    onChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface DatovelgerCommonProps {
    kalender?: {
        /** Om ukenumre skal vises - default false */
        visUkenumre?: boolean;
        /** Hvor kalender skal vises. Default under */
        plassering?: KalenderPlassering;
    };
    /** Begrensninger på hvilke datoer bruker kan velge */
    avgrensninger?: Avgrensninger;
    /** Default false. Tillater bruker å velge ugyldig dato. */
    kanVelgeUgyldigDato?: boolean;
    /** dayPickerProps */
    dayPickerProps?: DayPickerProps;
    /** Språk */
    locale?: string;
    /** Datovelger er låst */
    disabled?: boolean;
}
export interface Props extends DatovelgerCommonProps {
    /** Props for tekstinput feltet */
    input: DateInputProps;
    /** Valgt dato */
    dato?: Date;
    /** Kalles når en dato velges */
    onChange: (date: Date, validering?: DatoValidering) => void;
}
declare class Datovelger extends React.Component<Props, State> {
    input: Datoinput | null;
    setFokusPåKalenderKnapp: boolean | undefined;
    kalender: Kalender | null;
    kalenderKnapp: KalenderKnapp | null;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    onVelgDag(dato: Date, lukkKalender?: boolean): void;
    onDatoDateChange(dato: Date): void;
    onDateInputChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void;
    toggleKalender(): void;
    lukkKalender(settFokusPåKalenderknapp?: boolean): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    render(): JSX.Element;
}
export default Datovelger;
