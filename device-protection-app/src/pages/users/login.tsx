import React from 'react'
import { NextPage } from 'next'
import DefaultLayout from '@/components/Layouts/Layout'
import Login from '@/components/Login';
import AuthLayout from '@/components/AuthLayout';


const LoginPage: NextPage = () => {
    return(
        <AuthLayout>
            <DefaultLayout>
                <Login/>
            </DefaultLayout>
        </AuthLayout>
    ) 
}

export default LoginPage;