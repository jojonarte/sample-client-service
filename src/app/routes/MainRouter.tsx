import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../store';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';


const MainRouter: React.FC = () => {
  const isLoggedIn = useSelector<RootState>(state => state.auth.isLoggedIn)

  return (
    <BrowserRouter>
    {isLoggedIn ? <ProtectedRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  )
};

export default MainRouter;