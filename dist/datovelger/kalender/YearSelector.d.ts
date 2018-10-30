import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
export interface Props {
    date: Date;
    min?: Date;
    max?: Date;
    localeUtils: LocaleUtils;
    locale: string;
    onChange: (mnd: Date) => void;
}
declare class YearSelector extends React.Component<Props, {}> {
    constructor(props: Props);
    onChange(evt: React.ChangeEvent<HTMLElement>): void;
    onYearChange(evt: React.ChangeEvent<HTMLElement>): void;
    render(): JSX.Element;
}
export default YearSelector;
