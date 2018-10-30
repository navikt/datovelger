import * as React from 'react';
import { LocaleUtils } from 'react-day-picker/types/utils';
import { guid } from 'nav-frontend-js-utils';

export interface Props {
	dato: Date;
	min: Date;
	maks: Date;
	localeUtils: LocaleUtils;
	locale: string;
	onChange: (mnd: Date) => void;
}

class YearSelector extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	onChange(evt: React.ChangeEvent<HTMLElement>) {
		const { year, month } = (evt.target as HTMLFormElement).form;
		this.props.onChange(new Date(year.value, month.value));
	}
	render() {
		const { dato, min, maks, localeUtils, locale } = this.props;
		const months = localeUtils.getMonths(locale);

		const years = [];

		for (let i = min.getFullYear(); i <= maks.getFullYear(); i += 1) {
			years.push(i);
		}

		const mndSelectId = guid();
		const yearSelectId = guid();

		return (
			<form className="nav-datovelger__yearSelector">
				<div className="selectContainer">
					<label className="sr-only" htmlFor={mndSelectId}>
						Velg måned
					</label>
					<select
						id={mndSelectId}
						className="skjemaelement__input"
						name="month"
						onChange={this.onChange}
						value={dato.getMonth()}>
						{months.map((month, i) => (
							<option key={month} value={i}>
								{month}
							</option>
						))}
					</select>
				</div>
				<div className="selectContainer">
					<label className="sr-only" htmlFor={yearSelectId}>
						Velg år
					</label>
					<select
						id={yearSelectId}
						className="skjemaelement__input skjemaelement__input--year"
						name="year"
						onChange={this.onChange}
						value={dato.getFullYear()}>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
			</form>
		);
	}
}

export default YearSelector;
