import { Layout, Menu } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { authSlice } from 'src/features/auth/authSlice';

const PageLayout: React.FC = ({ children }) => {
    const isLoggedIn = useSelector<RootState>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    return (
        <Layout className="layout">
          <Layout.Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
            >
                {isLoggedIn ? (
                    <>
                        <Menu.Item ><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item ><Link to="/apps">Apps</Link></Menu.Item>
                        <Menu.Item onClick={() => dispatch(authSlice.actions.logOut())}>Logout</Menu.Item>
                    </>
                ) : <Menu.Item>Login</Menu.Item>}
                
            </Menu>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px' }}>
            {children}
          </Layout.Content>
        </Layout>
      );
}

export default PageLayout;
