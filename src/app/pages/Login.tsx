import { Tabs } from 'antd';
import React from 'react';
import { useLoginMutation, useRegisterMutation } from 'src/base/api';
import { FormValues } from 'src/base/components/AuthForm';
import AuthForm from 'src/base/components/AuthForm';
import PageLayout from 'src/base/components/templates/PageLayout';
import { authSlice } from 'src/features/auth/authSlice';
import { useAppDispatch } from '../hooks';
import { openNotificationWithIcon } from 'src/utils/notification';

const Login = () => {
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation()
    const [register] = useRegisterMutation()

    const onChange = (key: string) => {
        console.log(key);
    };

    const onLoginFinish = (values: FormValues) => {
        login(values).unwrap()
            .then(res => {
                dispatch(authSlice.actions.logIn({
                    token: res.accessToken
                }))
            })
            .catch(err => {
                openNotificationWithIcon('error', err?.data?.message, err?.data?.type)
            }) 
    };
    const onRegisterFinish = (values: FormValues) => {
        register(values).unwrap()
            .then(res => {
                dispatch(authSlice.actions.logIn({
                    token: res.accessToken
                }))
            })
            .catch(err => {
                openNotificationWithIcon('error', err?.data?.message, err?.data?.type)
            }) 
    };


    return (
        <PageLayout>
            <Tabs defaultActiveKey='login' onChange={onChange}>
                <Tabs.TabPane tab="Login" key="login">
                    <AuthForm onFinish={onLoginFinish} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Register" key="register">
                    <AuthForm onFinish={onRegisterFinish} />
                </Tabs.TabPane>
            </Tabs>
        </PageLayout>
    )
}

export default Login;
