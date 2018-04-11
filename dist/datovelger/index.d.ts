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
export interface Props {
    /** Påkrevd id som settes på inputfeltet */
    id: string;
    /** Valgt dato */
    dato?: Date;
    /** Begrensninger på hvilke datoer bruker kan velge */
    avgrensninger?: Avgrensninger;
    /** Kalles når en dato velges */
    onChange: (date: Date, validering?: DatoValidering) => void;
    /** Input props */
    inputProps?: {
        placeholder?: string;
        required?: boolean;
        ariaDescribedby?: string;
    };
    /** Om ukenumre skal vises - default false */
    visUkenumre?: boolean;
    /** Språk - default no */
    locale?: 'nb';
    /** Hvor kalender skal vises. Default under */
    kalenderplassering?: KalenderPlassering;
    /** Default false. Tillater bruker å velge ugyldig dato. */
    kanVelgeUgyldigDato?: boolean;
    /** dayPickerProps */
    dayPickerProps?: DayPickerProps;
}
declare class Datovelger extends React.Component<Props, State> {
    instansId: string;
    input: Datoinput | null;
    setFokusPåKalenderKnapp: boolean | undefined;
    kalender: Kalender | null;
    kalenderKnapp: KalenderKnapp | null;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    onVelgDag(dato: Date, lukkKalender?: boolean): void;
    onDatoDateChange(dato: Date): void;
    onDateInputChange(dato: string): void;
    toggleKalender(): void;
    lukkKalender(settFokusPåKalenderknapp?: boolean): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    render(): JSX.Element;
}
export default Datovelger;
