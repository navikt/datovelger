/// <reference types="react" />
import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
export interface Props {
    date: Date;
    localeUtils: LocaleUtils;
    locale: string;
    navbar?: React.ReactNode;
}
export declare class TittelOgNavigasjon extends React.Component<Props, {}> {
    shouldComponentUpdate(nextProps: any): boolean;
    render(): JSX.Element;
}
export default TittelOgNavigasjon;
