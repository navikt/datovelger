import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
import { guid } from 'nav-frontend-js-utils';
import * as moment from 'moment';

export interface Props {
	date: Date;
	min?: Date;
	max?: Date;
	localeUtils: LocaleUtils;
	locale: string;
	onChange: (mnd: Date) => void;
}

interface MonthOption {
	value: number;
	label: string;
}
const getAvailableMonths = (
	monthNames: string[],
	date: Date,
	min?: Date,
	maks?: Date
): MonthOption[] => {
	const options: MonthOption[] = [];
	const from =
		min && date.getFullYear() === min.getFullYear() ? min.getMonth() : 0;
	const to =
		maks && date.getFullYear() === maks.getFullYear() ? maks.getMonth() : 11;
	let m = from;
	while (m <= to) {
		options.push({
			value: m,
			label: monthNames[m]
		});
		m++;
	}
	return options;
};

class YearSelector extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onYearChange = this.onYearChange.bind(this);
	}

	onChange(evt: React.ChangeEvent<HTMLElement>) {
		const { year, month } = (evt.target as HTMLFormElement).form;
		this.props.onChange(new Date(year.value, month.value));
	}

	onYearChange(evt: React.ChangeEvent<HTMLElement>) {
		const { year, month } = (evt.target as HTMLFormElement).form;
		const newDate = new Date(year.value, month.value);
		if (this.props.min && moment(newDate).isBefore(this.props.min)) {
			this.props.onChange(this.props.min);
		} else if (this.props.max && moment(newDate).isAfter(this.props.max)) {
			this.props.onChange(this.props.max);
		} else {
			this.props.onChange(newDate);
		}
	}

	render() {
		const { date, min, max, localeUtils, locale } = this.props;
		const monthNames = localeUtils.getMonths(locale);
		const monthOptions = getAvailableMonths(monthNames, date, min, max);
		const years = [];
		for (let i = min.getFullYear(); i <= max.getFullYear(); i += 1) {
			years.push(i);
		}
		const mndSelectId = guid();
		const yearSelectId = guid();
		return (
			<div className="nav-datovelger__yearSelector">
				<div className="selectContainer">
					<label className="sr-only" htmlFor={yearSelectId}>
						Velg år
					</label>
					<select
						id={yearSelectId}
						className="skjemaelement__input skjemaelement__input--year"
						name="year"
						onChange={this.onYearChange}
						value={date.getFullYear()}>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				<div className="selectContainer">
					<label className="sr-only" htmlFor={mndSelectId}>
						Velg måned
					</label>
					<select
						id={mndSelectId}
						className="skjemaelement__input"
						name="month"
						onChange={this.onChange}
						value={date.getMonth()}>
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
