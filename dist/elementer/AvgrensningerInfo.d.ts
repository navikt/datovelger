/// <reference types="react" />
import * as React from 'react';
import { DatovelgerAvgrensninger } from '../types';
export interface Props {
    id: string;
    avgrensninger: DatovelgerAvgrensninger;
}
declare const AvgrensningerInfo: React.StatelessComponent<Props>;
export default AvgrensningerInfo;
