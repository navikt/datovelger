/// <reference types="react" />
export declare type ChevronRetning = 'opp' | 'ned' | 'høyre' | 'venstre';
export interface Props {
    retning?: ChevronRetning;
}
declare const Chevron: (props: Props) => JSX.Element;
export default Chevron;
