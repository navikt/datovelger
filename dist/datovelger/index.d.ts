/// <reference types="react" />
import * as React from 'react';
import { DatovelgerAvgrensninger } from './types';
import { DatoValidering } from './utils/datovalidering';
import KalenderKnapp from './elementer/KalenderKnapp';
import Datoinput from './Datoinput';
import Kalender from './kalender/Kalender';
export interface State {
    måned: Date;
    datovalidering: DatoValidering;
    erÅpen?: boolean;
    statusMessage: string;
}
export interface Props {
    /** Påkrevd id som settes på inputfeltet */
    id: string;
    /** Valgt dato */
    valgtDato?: Date;
    /** Begrensninger på hvilke datoer bruker kan velge */
    avgrensninger?: DatovelgerAvgrensninger;
    /** Kalles når en dato velges */
    onVelgDag: (date: Date) => void;
    /** Kalles når en ikke lovlig dato velges */
    onUgyldigDagValgt?: (date: Date, validering?: DatoValidering) => void;
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
    toggleKalender(): void;
    lukkKalender(settFokusPåKalenderknapp?: boolean): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    render(): JSX.Element;
}
export default Datovelger;
