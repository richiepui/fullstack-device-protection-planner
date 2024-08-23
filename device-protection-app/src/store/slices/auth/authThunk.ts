import { AppDispatch, RootState } from "@/store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateApiError } from "@/common/APIError";
import { ILoginApiResponse, IRegisterApiResponse, IVerifyJwtTokenResponse } from "@/types/auth";
import { ILoginRequest } from "@/types/auth";
import { loginApi, registerApi, verifyJwtTokenApi } from "@/services/auth";
import ErrorCodes from '@/common/error-codes';

const loginUser = async (
    credentials: ILoginRequest
): Promise<ILoginApiResponse> => {
    try{
        const response = await loginApi(credentials);
        if (!response){
            throw new Error('Unable to login');
        }
        return response
    } catch (error){
        console.error('Error in loginUser', error);
        throw error;
    }
}

const registerUser = async(
  registrationData: ILoginRequest
): Promise<IRegisterApiResponse> => {
  try{
      const response = await registerApi(registrationData);
      if(!response){
        throw new Error('Unable to register');
      }
      return response
  } catch (error) {
    console.error('Error in registerUser', error);
    throw error;
  }
}

const verifyJwt = async(
  token: string
): Promise<IVerifyJwtTokenResponse> => {
  try{
    const response = await verifyJwtTokenApi(token);
    if (!response){
      throw new Error('Unable to verify Jwt');
    }
    return response;
  } catch (error){
    console.error('Error in verifyJwt', error);
    throw error;
  }
}

export const loginThunk = createAsyncThunk<
  ILoginApiResponse,
  ILoginRequest,
  { dispatch: AppDispatch; state: RootState }
>(
  'auth/login',
  async ({username, password}, { dispatch, rejectWithValue }) => {
    try {
      
      const response = await loginUser({username, password});
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_LOGIN,
          `Unable to log in`,
          error.response.data.message || error.message,
        ),
      );
    }
  },
);


export const registerThunk = createAsyncThunk<
  IRegisterApiResponse,
  ILoginRequest,
  {dispatch: AppDispatch; state:RootState }
>(
  'auth/register',
  async({username, password}, {dispatch, rejectWithValue}) => {
    try{
      const response = await registerUser({username, password});
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_REGISTER,
          `Unable to register`,
          error.response.data.message || error.message
        )
      )
    }
  }
)

export const verifyJwtThunk = createAsyncThunk<
  IVerifyJwtTokenResponse,
  string,
  {dispatch: AppDispatch; state:RootState}
>(
  'auth/verifyJwt',
  async(token, {dispatch, rejectWithValue}) => {
    try{
      console.log("Thunks")
      console.log(token);
      const response = await verifyJwt(token);
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_VERIFY_JWT,
          `Unable to verifiy Jwt token / Jwt Token has expired`,
          error.response.data.message || error.message
        )
      )
    }
  }
)