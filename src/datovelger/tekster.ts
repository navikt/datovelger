export const Tekster = {
	kalenderLabel: 'Kalender',
	navbar_nesteManed_label: 'Neste måned',
	navbar_forrigeManed_label: 'Forrige måned',
	avgrensninger: {
		måVæreMellom: (fraDato: string, tilDato: string) =>
			`Dato må være mellom "${fraDato}" og "${tilDato}"`,
		fra: (dato: string) => `Fra ${dato}`,
		til: (dato: string) => `Til ${dato}`,
		helg: 'Lørdager og søndager er ikke valgbare'
	}
};