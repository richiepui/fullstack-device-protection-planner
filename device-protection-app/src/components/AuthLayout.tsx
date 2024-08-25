import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import { useAppDispatch } from '@/store/hook';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { verifyJwtThunk } from '@/store/slices/auth/authThunk';

const AuthLayout = ({children}: {children: React.ReactNode}) => {

    const dispatch = useAppDispatch();
    const jwtToken = useSelector((state: RootState) => state.auth.token) || "";

    const router = useRouter();


    useEffect(() => {
       const tokenFromCookies = Cookies.get('jwt') || "";
       const checkAuth = async () => {
        if (tokenFromCookies || jwtToken){
            try{
                const sentToken = jwtToken === "" ? tokenFromCookies : jwtToken
                await dispatch(verifyJwtThunk(sentToken)).unwrap()
                if (router.pathname === "/users/login"){
                    router.push('/devices')
                }
            } catch (err) { 
                router.push('/users/login')
            }
        }
    }
       checkAuth()
    }, [])

    return (
        <>{children}</>
    )
}

export default AuthLayout