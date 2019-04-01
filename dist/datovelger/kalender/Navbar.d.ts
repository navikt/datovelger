import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
import { MånedFokusElement } from './Kalender';
export interface Props {
    defaultMåned: Date;
    byttMåned: (month: Date, fokusElement: MånedFokusElement) => void;
    byttÅr?: (month: Date) => void;
    min?: Date;
    maks?: Date;
    visÅrVelger?: boolean;
    locale: string;
    localeUtils: LocaleUtils;
}
export interface NavbarKnappProps {
    måned: Date;
    retning: 'forrige' | 'neste';
    disabled: boolean;
    onClick: (evt: any, måned: Date, fokusElement: MånedFokusElement) => void;
}
declare class Navbar extends React.Component<Props> {
    shouldComponentUpdate(nextProps: any): boolean;
    render(): JSX.Element;
}
export default Navbar;
