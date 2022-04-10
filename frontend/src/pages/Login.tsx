import React from 'react';
import { LoginForm } from '../components/login/LoginForm';
import { Page } from '../components/Page';
import { loginMeta } from './MetaTags';

const Login: React.VFC = () => (
    <Page meta={loginMeta}>
        <h1>Login</h1>
        <LoginForm />
    </Page>
);

export default Login;
