import React from 'react';
import { useHistory } from 'react-router-dom';
import LeftMenu from './components/left-menu/LeftMenu';
import { getRouteConfig } from './config/routeConfig';
import Intro from './Intro';

const DevContent: React.FunctionComponent = () => {
    const history = useHistory();
    const {
        location: { pathname },
    } = history;
    const routeConfig = getRouteConfig(pathname);
    return (
        <>
            <aside className="asideContent">
                <LeftMenu />
            </aside>
            <article style={{ maxWidth: '1000px' }} className="mainContent">
                {routeConfig ? routeConfig.renderContent() : <Intro />}
            </article>
        </>
    );
};

export default DevContent;
