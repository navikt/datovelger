import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
export interface Props {
    date: Date;
    locale: string;
    localeUtils: LocaleUtils;
}
export declare class AktivManed extends React.Component<Props, {}> {
    shouldComponentUpdate(nextProps: any): boolean;
    render(): JSX.Element;
}
export default AktivManed;
