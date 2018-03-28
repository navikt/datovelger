/// <reference types="react" />
import * as React from 'react';
export interface Props {
    måned: Date;
    byttMåned: (month: Date) => void;
    byttÅr?: (month: Date) => void;
    min?: Date;
    maks?: Date;
}
export interface NavbarKnappProps {
    måned: Date;
    retning: 'forrige' | 'neste';
    disabled: boolean;
    onClick: (evt: React.MouseEvent<HTMLButtonElement>, måned: Date) => void;
}
declare const Navbar: React.StatelessComponent<Props>;
export default Navbar;
