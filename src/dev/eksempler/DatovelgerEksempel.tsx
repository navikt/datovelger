import React, { useState } from 'react';
import Datovelger from '../../datovelger/Datovelger';
import Box from '../components/box/Box';

interface Props {}

const DatovelgerEksempel: React.FunctionComponent<Props> = (props) => {
    const [dato, setDato] = useState<string | undefined>('');
    return (
        <div>
            <Datovelger
                valgtDato={dato}
                onChange={(d) => setDato(d)}
                id="datovelger"
                input={{ name: 'dato', id: 'ahl' }}
            />
            <Box>Valgt dato: {dato}</Box>
        </div>
    );
};
export default DatovelgerEksempel;
