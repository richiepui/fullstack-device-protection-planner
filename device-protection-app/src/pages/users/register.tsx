import React from 'react'
import { NextPage } from 'next'
import Register from '@/components/Register';
import DefaultLayout from '@/components/Layouts/Layout';

const RegisterPage: NextPage = () => {
    return (
        <DefaultLayout>
            <Register/>
        </DefaultLayout>
    )
}

export default RegisterPage;