export const Texts = {
    calendarLabel: 'Kalender',
    navBarNextMonthLabel: 'Neste måned',
    navbarPreviousMonthLabel: 'Forrige måned',
    limitations: {
        validDateRange: (fromDateString: string, toDateString: string) =>
            `Dato må være mellom "${fromDateString}" og "${toDateString}"`,
        from: (dateString: string) => `Fra ${dateString}`,
        to: (dato: string) => `Til ${dato}`,
        weekendsNotSelectable: 'Lørdager og søndager er ikke valgbare',
    },
};
