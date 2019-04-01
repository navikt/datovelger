import * as React from 'react';
import { DayPickerProps, Modifier, DayModifiers } from 'react-day-picker';
import { LocaleUtils } from 'react-day-picker/types/utils';
export interface Props {
    måned: Date;
    dato?: string;
    locale: string;
    min?: string;
    maks?: string;
    localeUtils?: LocaleUtils;
    onVelgDag: (dato: string) => void;
    onLukk: () => void;
    utilgjengeligeDager?: Modifier[];
    visUkenumre?: boolean;
    kanVelgeUgyldigDato?: boolean;
    visÅrVelger?: boolean;
    dayPickerProps?: DayPickerProps;
}
export interface State {
    måned: Date;
}
export declare type MånedFokusElement = 'neste' | 'forrige' | 'aar' | 'mnd';
export declare class Kalender extends React.Component<Props, State> {
    kalender: HTMLDivElement | null;
    nesteFokusertDato: Date | undefined;
    setFokusPåInput: boolean | undefined;
    månedFokusElement?: MånedFokusElement;
    constructor(props: Props);
    componentDidUpdate(prevProps: Props, prevState: State): void;
    settFokus(): void;
    onByttDag(dato: Date, modifiers: DayModifiers): void;
    onByttMåned(måned: Date, månedFokusElement?: MånedFokusElement): void;
    render(): JSX.Element;
}
export default Kalender;
