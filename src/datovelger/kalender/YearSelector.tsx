import React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
import moment from 'moment';
import { guid } from 'nav-frontend-js-utils';
import { NavFocusElement } from './Kalender';

export interface Props {
    defaultMonth: Date;
    min?: Date;
    max?: Date;
    localeUtils: LocaleUtils;
    locale: string;
    onChange: (mnd: Date, fokusElement: NavFocusElement) => void;
}

interface MonthOption {
    value: number;
    label: string;
}
const getAvailableMonths = (monthNames: string[], defaultMonth: Date, min?: Date, maks?: Date): MonthOption[] => {
    const options: MonthOption[] = [];
    const from = min && defaultMonth.getFullYear() === min.getFullYear() ? min.getMonth() : 0;
    const to = maks && defaultMonth.getFullYear() === maks.getFullYear() ? maks.getMonth() : 11;
    let m = from;
    while (m <= to) {
        options.push({
            value: m,
            label: monthNames[m],
        });
        m++;
    }
    return options;
};

class YearSelector extends React.Component<Props, {}> {
    yearSelect: HTMLSelectElement | null = null;
    monthSelect: HTMLSelectElement | null = null;

    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.getYear = this.getYear.bind(this);
        this.getMonth = this.getMonth.bind(this);
    }

    getYear(): number {
        if (this.yearSelect) {
            return parseInt(this.yearSelect.value, 10);
        }
        return (this.props.min || this.props.max || new Date()).getFullYear();
    }

    getMonth(): number {
        if (this.monthSelect) {
            return parseInt(this.monthSelect.value, 10);
        }
        return (this.props.min || this.props.max || new Date()).getMonth();
    }

    onChange() {
        this.props.onChange(new Date(this.getYear(), this.getMonth()), 'mnd');
    }

    onYearChange() {
        const year = parseInt(this.yearSelect?.value || '', 10);
        const month = parseInt(this.monthSelect?.value || '', 10);
        const newDate = new Date(year, month);
        if (this.props.min && moment(newDate).isBefore(this.props.min)) {
            this.props.onChange(this.props.min, 'aar');
        } else if (this.props.max && moment(newDate).isAfter(this.props.max)) {
            this.props.onChange(this.props.max, 'aar');
        } else {
            this.props.onChange(newDate, 'aar');
        }
    }

    render() {
        const {
            defaultMonth,
            min = new Date(1900, 0, 1),
            max = moment().add(4, 'years').toDate(),
            localeUtils,
            locale,
        } = this.props;
        const monthNames = localeUtils.getMonths(locale);
        const monthOptions = getAvailableMonths(monthNames, defaultMonth, min, max);
        const years: number[] = [];

        const minYear = Math.min(defaultMonth.getFullYear(), min.getFullYear());
        const maxYear = Math.max(defaultMonth.getFullYear(), max.getFullYear());
        for (let i = minYear; i <= maxYear; i += 1) {
            years.push(i);
        }

        const mndSelectId = guid();
        const yearSelectId = guid();
        const showYearSelect = years.length > 1;
        return (
            <div className="nav-datovelger__yearSelector">
                {showYearSelect && (
                    <div className="selectContainer">
                        <label className="sr-only" htmlFor={yearSelectId}>
                            Velg år
                        </label>
                        <select
                            id={yearSelectId}
                            ref={(c) => (this.yearSelect = c)}
                            className="skjemaelement__input skjemaelement__input--year"
                            name="year"
                            onChange={this.onYearChange}
                            value={defaultMonth.getFullYear()}>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className={`selectContainer${showYearSelect === false ? ' selectContainer--monthOnly' : ''}`}>
                    <label className="sr-only" htmlFor={mndSelectId}>
                        Velg måned
                    </label>
                    <select
                        id={mndSelectId}
                        ref={(c) => (this.monthSelect = c)}
                        className="skjemaelement__input"
                        name="month"
                        onChange={this.onChange}
                        value={defaultMonth.getMonth()}>
                        {monthOptions.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default YearSelector;
