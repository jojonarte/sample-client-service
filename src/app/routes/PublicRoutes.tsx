import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PageLoader from 'src/base/components/PageLoader';
import Login from '../pages/Login';

const PublicRoutes: React.FC = () => {
    return (
        <Switch>
            <Suspense fallback={<PageLoader />}>
                <Redirect from="*" to="/" />
                <Route path="/" exact component={Login} />
            </Suspense>
      </Switch>
    )
};

export default PublicRoutes;