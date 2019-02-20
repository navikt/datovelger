import { Avgrensninger, Tidsperiode } from '../types';
import * as moment from 'moment';
export declare const erDatoGyldig: (dato: string, avgrensninger?: Avgrensninger) => boolean;
export declare const erDatoIEnUgyldigTidsperiode: (dato: moment.Moment, ugyldigeTidsperioder: Tidsperiode[]) => boolean;
