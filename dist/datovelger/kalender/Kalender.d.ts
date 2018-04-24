/// <reference types="react" />
import * as React from 'react';
import { DayPickerProps, Modifier, DayModifiers } from 'react-day-picker';
import { LocaleUtils } from 'react-day-picker/types/utils';
export interface Props {
    måned: Date;
    dato?: Date | Date[];
    locale: string;
    min?: Date;
    maks?: Date;
    localeUtils?: LocaleUtils;
    onVelgDag: (dato: Date) => void;
    onLukk: () => void;
    utilgjengeligeDager?: Modifier[];
    visUkenumre?: boolean;
    kanVelgeUgyldigDato?: boolean;
    dayPickerProps?: DayPickerProps;
}
export interface State {
    måned: Date;
}
export declare class Kalender extends React.Component<Props, State> {
    kalender: HTMLDivElement | null;
    nesteFokusertDato: Date | undefined;
    setFokusPåInput: boolean | undefined;
    constructor(props: Props);
    componentDidUpdate(prevProps: Props, prevState: State): void;
    settFokus(): void;
    onByttDag(dato: Date, modifiers: DayModifiers): void;
    onByttMåned(måned: Date): void;
    navigerMåneder(evt: React.KeyboardEvent<any>, antall: number): void;
    render(): JSX.Element;
}
export default Kalender;
