import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
import { MånedFokusElement } from './Kalender';
export interface Props {
    defaultMonth: Date;
    min?: Date;
    max?: Date;
    localeUtils: LocaleUtils;
    locale: string;
    onChange: (mnd: Date, fokusElement: MånedFokusElement) => void;
}
declare class YearSelector extends React.Component<Props, {}> {
    yearSelect: HTMLSelectElement | null;
    monthSelect: HTMLSelectElement | null;
    constructor(props: Props);
    getYear(): number;
    getMonth(): number;
    onChange(evt: React.ChangeEvent<HTMLElement>): void;
    onYearChange(evt: React.ChangeEvent<HTMLElement>): void;
    render(): JSX.Element;
}
export default YearSelector;
