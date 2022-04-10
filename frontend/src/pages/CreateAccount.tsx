import React from 'react';
import { CreateAccountForm } from '../components/login/CreateAccountForm';
import { Page } from '../components/Page';
import { createAccountMeta } from './MetaTags';

const CreateAccount: React.VFC = () => (
    <Page meta={createAccountMeta}>
        <h1>Create Account</h1>
        <CreateAccountForm />
        <p>note: not yet functional</p>
    </Page>
);

export default CreateAccount;
