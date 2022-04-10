import React from 'react';
import { LoginForm } from '../components/login/LoginForm';
import { Page } from '../components/Page';
import { loginMeta } from './MetaTags';
import styles from '../css/pages/login.module.scss';
import { Link } from 'react-router-dom';

const Login: React.VFC = () => (
    <Page meta={loginMeta}>
        <h1>Login</h1>
        <LoginForm />
        <p className={styles.createAccount}>
            Don't have an account? <Link to='/create-account'>Create an account</Link>.
        </p>
        <p>Note: not yet functional</p>
    </Page>
);

export default Login;
