import React from 'react';
import 'nav-frontend-skjema-style';
import { Normaltekst } from 'nav-frontend-typografi';
import DevPage from './dev/DevPage';
import './dev/styles/globalStyles.less';

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <DevPage />
        </Normaltekst>
    );
};

export default App;
