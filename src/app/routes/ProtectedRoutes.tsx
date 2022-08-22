import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import PageLoader from 'src/base/components/PageLoader';
const Home = lazy(() => import('../pages/Home')) ;
const Apps = lazy(() => import('../pages/Apps/Apps')) ;

const ProtectedRoutes: React.FC = () => {
    return (
        <Switch>
            <Suspense fallback={<PageLoader />}>
                <Route path="/" exact component={Home} />
                <Route path="/apps" exact component={Apps} />
                <Route path="/apps/:id" component={Home} />
            </Suspense>
      </Switch>
    )
};

export default ProtectedRoutes;