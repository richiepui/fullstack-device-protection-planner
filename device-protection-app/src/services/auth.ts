import { ILoginApiResponse, ILoginRequest, IRegisterApiResponse, IVerifyJwtTokenResponse } from "@/types/auth";
import axios from 'axios'

export const loginApi = async (credentials: ILoginRequest): Promise<ILoginApiResponse>=>{
    try{
        const response = await axios.post('http://localhost:3000/users/login', credentials)
        return response.data
    } catch (error) {
        console.error('Error during login: ', error);
        throw error;
    }
}

export const registerApi = async(registrationData: ILoginRequest): Promise<IRegisterApiResponse> => {
    try{
        const response = await axios.post('http://localhost:3000/users/register', registrationData)
        return response.data
    } catch(error) {
        console.error('Error during registration: ', error);
        throw error;
    }
}

export const verifyJwtTokenApi = async(token: string): Promise<IVerifyJwtTokenResponse> => {
    try{
        const response = await axios.post('http://localhost:3000/users/verifyJwt', {token: token});
        return response.data
    } catch(error){
        console.error('Error during verifying Jwt token: ', error);
        throw error;
    }
}