import { DatovelgerAvgrensninger, Tidsperiode } from '../types';
import * as moment from 'moment';
export declare const erDatoGyldig: (dato: string, avgrensninger?: DatovelgerAvgrensninger) => boolean;
export declare const erDatoIEnUgyldigTidsperiode: (dato: moment.Moment, ugyldigeTidsperioder: Tidsperiode[]) => boolean;
