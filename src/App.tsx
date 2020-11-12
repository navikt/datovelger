import React from 'react';
import 'nav-frontend-skjema-style';
import { Normaltekst } from 'nav-frontend-typografi';
import DevPage from './dev/DevPage';
import './dev/styles/globalStyles.less';

require('../node_modules/dayjs/locale/nb.js');
require('../node_modules/dayjs/locale/nn.js');

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <DevPage />
        </Normaltekst>
    );
};

export default App;
