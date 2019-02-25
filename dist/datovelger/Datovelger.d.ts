import * as React from 'react';
import { DatovelgerAvgrensninger, KalenderPlassering } from './types';
import { DayPickerProps } from 'react-day-picker';
import KalenderKnapp from './elementer/KalenderKnapp';
import Datoinput from './Datoinput';
import Kalender from './kalender/Kalender';
export interface State {
    måned: Date;
    erDatoGyldig: boolean;
    erÅpen?: boolean;
    inputValue: string;
}
export interface DateInputProps {
    id: string;
    name: string;
    ariaLabel?: string;
    placeholder?: string;
    required?: boolean;
    ariaDescribedby?: string;
    onChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface DatovelgerCommonProps {
    id: string;
    kalender?: {
        visUkenumre?: boolean;
        plassering?: KalenderPlassering;
    };
    avgrensninger?: DatovelgerAvgrensninger;
    kanVelgeUgyldigDato?: boolean;
    dayPickerProps?: DayPickerProps;
    locale?: string;
    disabled?: boolean;
}
export interface Props extends DatovelgerCommonProps {
    input: DateInputProps;
    valgtDato?: string;
    visÅrVelger?: boolean;
    onChange: (date: string) => void;
}
declare class Datovelger extends React.Component<Props, State> {
    input: Datoinput | null;
    setFokusPåKalenderKnapp: boolean | undefined;
    kalender: Kalender | null;
    kalenderKnapp: KalenderKnapp | null;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    onKalenderChange(dato: string, lukkKalender?: boolean): void;
    onDatoinputChange(dato: string): void;
    onDatoInputOnChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void;
    toggleKalender(): void;
    lukkKalender(settFokusPåKalenderknapp?: boolean): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    render(): JSX.Element;
}
export default Datovelger;
