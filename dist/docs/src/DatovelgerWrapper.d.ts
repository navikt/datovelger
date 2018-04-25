/// <reference types="react" />
import * as React from 'react';
import { KalenderPlassering, Avgrensninger } from '../../src/datovelger/types';
export interface Props {
}
export interface State {
    dato: Date | undefined;
    inputValue: string;
    error: string | undefined;
    avgrensninger: Avgrensninger;
    plassering: KalenderPlassering;
    startdato?: Date;
    sluttdato?: Date;
}
declare class DatovelgerWrapper extends React.Component<Props, State> {
    constructor(props: Props);
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
    oppdaterDato(dato?: Date): void;
    addDay(days: number): void;
    render(): JSX.Element;
}
export default DatovelgerWrapper;
