import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import classnames from 'classnames';
import DomEventContainer from './common/DomEventContainer';
import Datoinput from './Datoinput';
import KalenderKnapp from './elementer/KalenderKnapp';
import KalenderPortal from './elementer/KalenderPortal';
import Kalender from './kalender/Kalender';
import { DatovelgerAvgrensninger, KalenderPlassering } from './types';
import { getDefaultMåned, getUtilgjengeligeDager } from './utils';
import { erDatoGyldig } from './utils/datovalidering';

interface State {
    måned: Date;
    erDatoGyldig: boolean;
    erÅpen?: boolean;
    inputValue: string;
}

export interface DateInputProps {
    id: string;
    name: string;
    ariaLabel?: string;
    placeholder?: string;
    required?: boolean;
    ariaDescribedby?: string;
    onChange?: (value: string, evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DatovelgerCommonProps {
    id: string;
    kalender?: {
        visUkenumre?: boolean;
        plassering?: KalenderPlassering;
    };
    avgrensninger?: DatovelgerAvgrensninger;
    kanVelgeUgyldigDato?: boolean;
    dayPickerProps?: DayPickerProps;
    locale?: string;
    disabled?: boolean;
}

export interface DatovelgerProps extends DatovelgerCommonProps {
    input: DateInputProps;
    valgtDato?: string;
    visÅrVelger?: boolean;
    onChange: (date?: string) => void;
}

class Datovelger extends React.Component<DatovelgerProps, State> {
    input: Datoinput | null = null;
    setFokusPåKalenderKnapp: boolean | undefined;
    kalender: Kalender | null = null;
    kalenderKnapp: KalenderKnapp | null = null;

    constructor(props: DatovelgerProps) {
        super(props);

        this.onKalenderChange = this.onKalenderChange.bind(this);
        this.onDatoinputChange = this.onDatoinputChange.bind(this);
        this.toggleKalender = this.toggleKalender.bind(this);
        this.lukkKalender = this.lukkKalender.bind(this);
        this.onDatoInputOnChange = this.onDatoInputOnChange.bind(this);

        this.state = {
            måned: getDefaultMåned(props.valgtDato, props.avgrensninger, props.dayPickerProps),
            erDatoGyldig: erDatoGyldig(props.valgtDato),
            erÅpen: false,
            inputValue: ' '
        };
    }

    componentWillReceiveProps(nextProps: DatovelgerProps) {
        this.setState({
            erDatoGyldig: erDatoGyldig(nextProps.valgtDato, nextProps.avgrensninger),
            måned: getDefaultMåned(nextProps.valgtDato, nextProps.avgrensninger, nextProps.dayPickerProps)
        });
    }

    onKalenderChange(dato: string, lukkKalender?: boolean) {
        this.setState(
            {
                erÅpen: false,
                erDatoGyldig: erDatoGyldig(dato, this.props.avgrensninger)
            },
            () => {
                this.props.onChange(dato);
                if (lukkKalender) {
                    this.lukkKalender(true);
                }
            }
        );
    }

    onDatoinputChange(dato?: string) {
        this.setState(
            {
                erÅpen: false,
                erDatoGyldig: erDatoGyldig(dato, this.props.avgrensninger)
            },
            () => {
                this.props.onChange(dato);
            }
        );
    }

    onDatoInputOnChange(value: string, event: React.ChangeEvent<HTMLInputElement>) {
        const { avgrensninger, input } = this.props;
        const dato = event.target.value;
        this.setState({
            erÅpen: false,
            erDatoGyldig: erDatoGyldig(dato, avgrensninger),
            inputValue: dato
        });
        if (input && input.onChange) {
            input.onChange(value, event);
        }
    }

    toggleKalender() {
        this.setFokusPåKalenderKnapp = true;
        this.setState({ erÅpen: !this.state.erÅpen });
    }

    lukkKalender(settFokusPåKalenderknapp?: boolean) {
        this.setState({ erÅpen: false });
        this.setFokusPåKalenderKnapp = settFokusPåKalenderknapp;
    }

    componentDidUpdate(prevProps: DatovelgerProps, prevState: State) {
        if (!prevState.erÅpen && this.state.erÅpen && this.kalender) {
            this.kalender.settFokus();
        } else if (prevState.erÅpen && !this.state.erÅpen && this.setFokusPåKalenderKnapp && this.kalenderKnapp) {
            this.setFokusPåKalenderKnapp = false;
            this.kalenderKnapp.focus();
        }
    }

    render() {
        const {
            valgtDato,
            input,
            kalender,
            avgrensninger,
            locale = 'nb',
            disabled,
            visÅrVelger,
            kanVelgeUgyldigDato = false,
            ...kalenderProps
        } = this.props;

        const { erÅpen, erDatoGyldig: stateErDatoGyldig } = this.state;

        const { onChange, ariaDescribedby, ariaLabel, ...restOfInputProps } = input;
        const dateInputProps = {
            name: input && input.name ? input.name : `${this.props.id}__input`,
            'aria-invalid': stateErDatoGyldig,
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedby,
            ...restOfInputProps
        };

        return (
            <DomEventContainer>
                <div className={classnames('nav-datovelger')}>
                    <div className="nav-datovelger__inputContainer">
                        <Datoinput
                            inputProps={dateInputProps}
                            ref={(c) => (this.input = c)}
                            valgtDato={valgtDato || ''}
                            onDateChange={this.onDatoinputChange}
                            onInputChange={this.onDatoInputOnChange}
                            disabled={disabled}
                        />
                        <KalenderKnapp
                            disabled={disabled}
                            ref={(c) => (this.kalenderKnapp = c)}
                            onClick={this.toggleKalender}
                            erÅpen={erÅpen || false}
                        />
                    </div>
                    {erÅpen && (
                        <KalenderPortal plassering={kalender && kalender.plassering}>
                            <Kalender
                                ref={(c) => (this.kalender = c)}
                                {...kalenderProps}
                                locale={locale}
                                dato={valgtDato}
                                måned={this.state.måned}
                                min={avgrensninger && avgrensninger.minDato}
                                maks={avgrensninger && avgrensninger.maksDato}
                                utilgjengeligeDager={avgrensninger ? getUtilgjengeligeDager(avgrensninger) : undefined}
                                onVelgDag={(d: string) => this.onKalenderChange(d, true)}
                                onLukk={() => this.lukkKalender(true)}
                                kanVelgeUgyldigDato={kanVelgeUgyldigDato}
                                dayPickerProps={this.props.dayPickerProps}
                                visÅrVelger={visÅrVelger}
                            />
                        </KalenderPortal>
                    )}
                </div>
            </DomEventContainer>
        );
    }
}

export default Datovelger;
