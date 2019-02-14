export interface Tidsperiode {
	fom: string;
	tom: string;
}

export interface Avgrensninger {
	minDato?: string;
	maksDato?: string;
	ugyldigeTidsperioder?: Tidsperiode[];
	helgedagerIkkeTillatt?: boolean;
}

export interface FraseDato {
	date: string;
}

export type KalenderPlassering = 'under' | 'fullskjerm' | '';

export interface DatovelgerPhrases {
	calendarLabel: string;
	closeDatePicker: string;
	clearDate: string;
	jumpToPrevMonth: string;
	jumpToNextMonth: string;
	keyboardShortcuts: string;
	showKeyboardShortcutsPanel: string;
	hideKeyboardShortcutsPanel: string;
	openThisPanel: string;
	enterKey: string;
	leftArrowRightArrow: string;
	upArrowDownArrow: string;
	pageUpPageDown: string;
	homeEnd: string;
	escape: string;
	questionMark: string;
	selectFocusedDate: string;
	moveFocusByOneDay: string;
	moveFocusByOneWeek: string;
	moveFocusByOneMonth: string;
	moveFocustoStartAndEndOfWeek: string;
	returnFocusToInput: string;
	keyboardNavigationInstructions: string;
	chooseAvailableDate: (d: FraseDato) => any;
	dateIsUnavailable: (d: FraseDato) => string;
	dateIsSelected: (d: FraseDato) => string;
}
