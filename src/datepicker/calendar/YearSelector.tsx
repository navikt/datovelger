/* eslint-disable jsx-a11y/no-onchange */
import React, { ChangeEvent } from 'react';
import { LocaleUtils } from 'react-day-picker';
import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import { NavigationFocusElement } from './Calendar';

export interface Props {
    defaultMonth: Date;
    minDate?: Date;
    maxDate?: Date;
    localeUtils: LocaleUtils;
    onChange: (month: Date, focusElement: NavigationFocusElement) => void;
}

interface MonthOption {
    value: number;
    label: string;
}
const getAvailableMonths = (
    monthNames: string[],
    defaultMonth: Date,
    minDate?: Date,
    maxDate?: Date
): MonthOption[] => {
    const options: MonthOption[] = [];
    const from = minDate && defaultMonth.getFullYear() === minDate.getFullYear() ? minDate.getMonth() : 0;
    const to = maxDate && defaultMonth.getFullYear() === maxDate.getFullYear() ? maxDate.getMonth() : 11;
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

class YearSelector extends React.Component<Props> {
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
        return (this.props.minDate || this.props.maxDate || new Date()).getFullYear();
    }

    getMonth(): number {
        if (this.monthSelect) {
            return parseInt(this.monthSelect.value, 10);
        }
        return (this.props.minDate || this.props.maxDate || new Date()).getMonth();
    }

    onChange(evt: ChangeEvent<HTMLSelectElement>) {
        evt.stopPropagation();
        evt.preventDefault();
        this.props.onChange(new Date(this.getYear(), this.getMonth()), 'month');
    }

    onYearChange(evt: ChangeEvent<HTMLSelectElement>) {
        evt.stopPropagation();
        evt.preventDefault();

        const year = parseInt(this.yearSelect?.value || '', 10);
        const month = parseInt(this.monthSelect?.value || '', 10);
        const newDate = new Date(year, month);
        if (this.props.minDate && dayjs(newDate).isBefore(this.props.minDate)) {
            this.props.onChange(this.props.minDate, 'year');
        } else if (this.props.maxDate && dayjs(newDate).isAfter(this.props.maxDate)) {
            this.props.onChange(this.props.maxDate, 'year');
        } else {
            this.props.onChange(newDate, 'year');
        }
    }

    render() {
        const {
            defaultMonth,
            minDate: min = new Date(1900, 0, 1),
            maxDate: max = dayjs().add(4, 'year').toDate(),
            localeUtils,
        } = this.props;
        const monthNames = localeUtils.getMonths();
        const monthOptions = getAvailableMonths(monthNames, defaultMonth, min, max);
        const years: number[] = [];

        const minYear = Math.min(defaultMonth.getFullYear(), min.getFullYear());
        const maxYear = Math.max(defaultMonth.getFullYear(), max.getFullYear());
        for (let i = minYear; i <= maxYear; i += 1) {
            years.push(i);
        }

        const monthSelectId = guid();
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
                    <label className="sr-only" htmlFor={monthSelectId}>
                        Velg måned
                    </label>
                    <select
                        id={monthSelectId}
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
